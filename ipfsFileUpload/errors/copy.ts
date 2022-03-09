import { Collection } from '~ipfsFileUpload/utilities/collection'


export const copy: Collection = {
  ipfs: {
    add: {
      addFromBuffer: 'there was an error adding the uploaded file',
    },
    key: {
      generate: 'there was an error generating the key',
    },
    name: {
      publish: 'there was an error publishing the name'
    },
    pin: 'there was an error pinning the uploaded file'
  }
}