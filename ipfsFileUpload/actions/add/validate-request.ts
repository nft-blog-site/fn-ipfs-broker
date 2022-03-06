import { copy } from '~ipfsFileUpload/actions/errors/copy'

export const validateRequest = req => {
  if (!req.query?.path) return { body: copy.errors.queryParameters.path }
  
  // `filename` is required property to use multi-part npm package
  if (!req.query?.filename) 
    return { body: copy.errors.queryParameters.filename }
  
  if (!req.body || !req.body.length)
    return { body: copy.errors.queryParameters.bodyNotDefined }
    
    // Content type is required to know how to parse multi-part form
    if (!req.headers || !req.headers["content-type"])
      return { body: copy.errors.headers.contentTypeNotDefined }    
}
