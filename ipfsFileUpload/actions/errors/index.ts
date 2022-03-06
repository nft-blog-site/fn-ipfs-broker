import { limitToObject } from '~ipfsFileUpload/utilities/limit-to-object'


export const DEFAULT_ERROR_RESPONSE = {
  success: false
}

export function factoryGenericErrorResponse(partial = {}) {
  return Object.assign(
    {}, 
    limitToObject(partial, DEFAULT_ERROR_RESPONSE), 
    DEFAULT_ERROR_RESPONSE
  )
}
