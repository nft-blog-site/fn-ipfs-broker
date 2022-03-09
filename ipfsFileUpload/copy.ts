import { Collection } from "~ipfsFileUpload/utilities/collection"
import { copy as sharedCopy } from "~ipfsFileUpload/errors/copy"


export const copy: Collection = {
  ...sharedCopy,
  headers: {
    signature: 'missing user-associative header signature',
    filename: 'missing header filename',
    contentTypeNotDefined: "Content type is not sent in header 'content-type'"
  },
  body: {
    bodyNotDefined: 'request body is not defined',
    badBuffer: 'file buffer is not correct (Content-type issue?)'
  },
}