import { Context, HttpRequest } from '@azure/functions'
import * as multipart from "parse-multipart"
import HTTP_STATUS_CODES from 'http-status-enum'

import { requestResolver } from '~ipfsFileUpload/utilities/request-resolver'
import { invalidRequestPayloadError } from '~ipfsFileUpload/actions/errors/invalid-request-payload.error'
import { copy } from '~ipfsFileUpload/actions/errors/copy'
import { validateRequest } from './validate-request'
import { addFromBuffer } from './add-from-buffer'
import { ipfsError } from '../errors/ipfs.error'
import { pin } from './pin'


/* process an http request for adding to our ipfs node(s). */
export const add = async (context: Context, req: HttpRequest) => {
  const resolveTransaction = requestResolver(context.res)
  
  const invalidRequest = validateRequest(req)
  if (invalidRequest) {
    context.log.error('error', invalidRequest)
    resolveTransaction(invalidRequestPayloadError(invalidRequest))
    return
  }

  try {
    // Each chunk of the file is delimited by a special string
    const bodyBuffer = Buffer.from(req.body)
    const boundary = multipart.getBoundary(req.headers["content-type"])
    const parts = multipart.Parse(bodyBuffer, boundary)

    // The file buffer is corrupted or incomplete ?
    if (!parts?.length) {
      const message = copy.errors.body.badBuffer
      context.log.error('error', invalidRequestPayloadError({ message }))
      resolveTransaction(invalidRequestPayloadError({ message }))
      return
    }

    context.log(
      'Original filename = %s, Content type = %s, Size = %i', 
      parts[0]?.filename, 
      parts[0]?.type, 
      parts[0]?.data?.length
    )

    // TODO add the identity of the user to the directory to add and pin

    const addResult = await addFromBuffer(
      `${req.query?.path}/${req.query?.filename}`,
      parts[0]?.data
    )
    if (!addResult) {
      resolveTransaction(ipfsError({ message: copy.ipfs.addFromBuffer }))
      return
    }

    const pinResult = await pin(addResult.cid)
    if (!pinResult) {
      resolveTransaction(ipfsError({ message: copy.ipfs.pin }))
      return
    }

    resolveTransaction({
      status: HTTP_STATUS_CODES.OK,
      body: {
        cid: String(addResult.cid),
        ...pinResult
      }
    })
  } catch (err) {
    context.log.error('500 error', err.message)
    resolveTransaction({
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: {message: String(err.message)}
    })
  }
}
