import HTTP_CODES from "http-status-enum"

import { factoryGenericErrorResponse } from "."


/* create response bodies for ipfs failures */
export const ipfsErrorResponseBody = error => {
  const status = HTTP_CODES.INTERNAL_SERVER_ERROR
  return factoryGenericErrorResponse({ status, body: { status, error } })
}