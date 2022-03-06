import { Collection } from "./utilities/collection"


export const config: Collection = {
  IPFS_API_URI: process.env.IPFS_API_URI || 'https://localhost:5001',
}
