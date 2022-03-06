import HTTP_CODES from "http-status-enum"

import { factoryGenericErrorResponse } from "."


/* create response bodies for bad requests */
export const invalidRequestPayloadError = error => {
  const status = HTTP_CODES.BAD_REQUEST
  return factoryGenericErrorResponse({ status, body: { status, error } })
}
