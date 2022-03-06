import { Collection } from '~ipfsFileUpload/utilities/collection'


export const copy: Collection = {
  queryParameters: {
    path: 'missing queryParameter path',
    filename: 'missing queryParameter filename',
    bodyNotDefined: 'request body is not defined'
  },
  headers: {
    contentTypeNotDefined: "Content type is not sent in header 'content-type'"
  },
  body: {
    badBuffer: 'file buffer is not correct (Content-type issue?)'
  }
}