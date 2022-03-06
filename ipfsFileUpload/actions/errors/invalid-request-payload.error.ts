import HTTP_CODES from "http-status-enum"

import { config } from "~ipfsFileUpload/config"
import { factoryGenericErrorResponse } from "."


export const invalidRequestPayloadError = schema => {
  const status = HTTP_CODES.BAD_REQUEST
  const error = config.errors.invalidRequestPayloadError
  return factoryGenericErrorResponse({ status, body: { status, error, schema } })
}
