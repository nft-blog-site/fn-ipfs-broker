import 'module-alias/register'
import {Context, HttpRequest} from '@azure/functions'
import * as multipart from "parse-multipart"
import HTTP_STATUS_CODES from 'http-status-enum'

import {requestResolver} from '~ipfsFileUpload/utilities/request-resolver'
import {invalidRequestPayloadError} from '~ipfsFileUpload/errors/invalid-request-payload.error'
import {ipfsErrorResponseBody} from '~ipfsFileUpload/errors/ipfs.error'
import {add} from '~ipfsFileUpload/actions/add'
import {publish} from '~ipfsFileUpload/actions/name/publish'
import {getKey} from '~ipfsFileUpload/actions/key/get-key'
import {factoryHttpTrigger} from '~ipfsFileUpload/utilities/http-trigger.factory'
import {copy as errors} from './copy'
import {validateRequest} from './validate-request'
import { config } from './config'


/* process an http request for adding to our ipfs node(s). */
const addTrigger = async (context : Context, req : HttpRequest) => {
  const resolveTransaction = requestResolver(context.res)

  const invalidRequest = validateRequest(req)
  if (invalidRequest) {
    context.log.error('error', invalidRequest)
    resolveTransaction(invalidRequestPayloadError(invalidRequest))
    return
  }
  
  try { // Each chunk of the file is delimited by a special string
    const bodyBuffer = Buffer.from(req.body)
    const boundary = multipart.getBoundary(req.headers["content-type"])
    const parts = multipart.Parse(bodyBuffer, boundary)

    // The file buffer is corrupted or incomplete ?
    if (! parts ?. length) {
      const message = errors.errors.body.badBuffer
      context.log.error('error', invalidRequestPayloadError({message}))
      resolveTransaction(invalidRequestPayloadError({message}))
      return
    }

    context.log('Original filename = %s, Content type = %s, Size = %i', 
      parts[0] ?. filename, parts[0] ?. type, parts[0] ?. data ?. length)

    const addResult = await add(parts[0] ?. data)
    if (! addResult) {
      resolveTransaction(ipfsErrorResponseBody({message: errors.ipfs.add.addFromBuffer}))
      return
    }

    // get the key for the user's signature and asset name
    const key = await getKey(req.headers.signature + req.headers.filename)
    if (! key) {
      resolveTransaction(ipfsErrorResponseBody({message: errors.ipfs.key.generate}))
      return
    }

    const body = await publish(addResult.cid, key.name)
    if (! body) {
      resolveTransaction(ipfsErrorResponseBody({message: errors.ipfs.name.publish}))
      return
    }

    resolveTransaction({
      body: {
        key: key.name,
        ipns: 'ipns://' + key.id,
        ipfs: 'ipfs://' + body.value
      },
      status: HTTP_STATUS_CODES.OK
    })
  } catch (err) {
    context.log.error('500 error', err.message, err.stack)
    resolveTransaction({
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: String(err.message)
      }
    })
  }
}
export default factoryHttpTrigger({
  functionName: config.fnName, 
  fn: addTrigger, 
  backendURL: config.backendURL
})
