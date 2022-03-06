import { create } from 'ipfs-http-client'

import { config } from './config'


// connect to the default API address http://localhost:5001
export const client = create(config.IPFS_API_URI)