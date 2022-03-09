import { copy } from '~ipfsFileUpload/errors/copy'


/* validate the query parameters and basic structure of the http post */
export const validateRequest = req => {  
  // `filename` is required property to use multi-part npm package
  if (!req.headers?.filename) return { message: copy.headers.filename }
  
  if (!req.body?.length) return { message: copy.body.bodyNotDefined }
    
  // Content type is required to know how to parse multi-part form
  if (!req.headers?.["content-type"])
    return { message: copy.headers.contentTypeNotDefined }   
    
  // 'signature' is per user and maps their ipfs to their ipns
  if (!req.headers?.signature) return { message: copy.headers.signature }
}
