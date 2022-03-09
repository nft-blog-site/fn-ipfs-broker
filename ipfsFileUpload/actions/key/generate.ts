import type { Key } from "ipfs-core-types/src/key" 

import { IPFSClientService } from "~ipfsFileUpload/services/ipfs-client.service"
import { factoryTimedTry } from "~ipfsFileUpload/utilities/timed-try.factory"
import { ACTION_KEYGENERATE } from "~ipfsFileUpload/actions/constants"


export const generate = factoryTimedTry({
  fn: async name => await IPFSClientService.client.key.gen(name),
  action: ACTION_KEYGENERATE
})  as (name: string) => Promise<Key | undefined>
