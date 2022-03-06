import { Context, HttpRequest } from '@azure/functions'
import * as multipart from "parse-multipart"
import HTTP_STATUS_CODES from 'http-status-enum'

import { requestResolver } from '~ipfsFileUpload/utilities/request-resolver'
import { invalidRequestPayloadError } from '~ipfsFileUpload/actions/errors/invalid-request-payload.error'
import { validateRequest } from './validate-request'
import { addFromBuffer } from './add-from-buffer'
import { copy } from '../errors/copy'


export const add = (context: Context, req: HttpRequest) => {
  const resolveTransaction = requestResolver(context.res)
  
  const invalidRequest = validateRequest(req)
  if (invalidRequest) {
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
      const body = copy.errors.body.badBuffer
      resolveTransaction(invalidRequestPayloadError({ body }))
    }

    context.log(
      'Original filename = %s, Content type = %s, Size = %i', 
      parts[0]?.filename, 
      parts[0]?.type, 
      parts[0]?.data?.length
    )

    const body = addFromBuffer(
      `${req.query?.path}/${req.query?.filename}`,
      parts[0]?.data
    )
    
    resolveTransaction({
      status: HTTP_STATUS_CODES.OK,
      body
    })
  } catch (err) {
    context.log.error(err.message)
    resolveTransaction({
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: String(err.message)
    })
  }
}
