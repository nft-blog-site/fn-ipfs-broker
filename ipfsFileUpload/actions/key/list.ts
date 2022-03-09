import type { Key } from "ipfs-core-types/src/key" 

import { IPFSClientService } from "~ipfsFileUpload/services/ipfs-client.service"
import { factoryTimedTry } from "~ipfsFileUpload/utilities/timed-try.factory"
import { ACTION_KEYLIST } from "~ipfsFileUpload/actions/constants"


export const list = factoryTimedTry({
  fn: async () => await IPFSClientService.client.key.list(),
  action: ACTION_KEYLIST
})  as () => Promise<Key[] | undefined>
