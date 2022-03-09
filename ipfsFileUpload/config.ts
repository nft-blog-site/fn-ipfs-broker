import { Collection } from "~ipfsFileUpload/utilities/collection"


export const config: Collection = {
  fnName: 'ipfsFileUpload',
  backendURL: process.env.IPFS_API_URI || 'http://localhost:5001',
  'validate-request': {
    'minimum-body-length': 178
  }
}
