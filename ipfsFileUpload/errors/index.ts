import HTTP_STATUS_CODES from 'http-status-enum'

import { limitToObject } from '~ipfsFileUpload/utilities/limit-to-object'
import { LogService } from '~ipfsFileUpload/services/log.service'


/* create generic error response bodies */
export const DEFAULT_ERROR_RESPONSE = {
  status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
  body: {}
}

export function factoryGenericErrorResponse(partial = {}) {
  LogService.logger(limitToObject(partial, DEFAULT_ERROR_RESPONSE))
  return Object.assign(
    {}, 
    DEFAULT_ERROR_RESPONSE,
    limitToObject(partial, DEFAULT_ERROR_RESPONSE)
  )
}
