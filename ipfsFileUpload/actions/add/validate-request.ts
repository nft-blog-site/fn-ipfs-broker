import { copy } from '~ipfsFileUpload/actions/errors/copy'


/* validate the query parameters and basic structure of the http post */
export const validateRequest = req => {
  if (!req.query?.path) return { message: copy.queryParameters.path }
  
  // `filename` is required property to use multi-part npm package
  if (!req.query?.filename) 
    return { message: copy.queryParameters.filename }
  
  if (!req.body || !req.body.length)
    return { message: copy.queryParameters.bodyNotDefined }
    
    // Content type is required to know how to parse multi-part form
    if (!req.headers || !req.headers["content-type"])
      return { message: copy.headers.contentTypeNotDefined }    
}
