import { create, IPFSHTTPClient } from 'ipfs-http-client'


/* IPFS Client - connect to the default API address http://localhost:5001 */
export const IPFSClientService: {client: IPFSHTTPClient} = {
  client: null
}

export function setClientURL(url: string | URL) {
  IPFSClientService.client = create({url})
}
