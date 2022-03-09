import type { PublishResult } from "ipfs-core-types/src/name"
import type { CID } from "ipfs-http-client"

import { IPFSClientService } from "~ipfsFileUpload/services/ipfs-client.service"
import { factoryTimedTry } from "~ipfsFileUpload/utilities/timed-try.factory"
import { ACTION_NAMEPUBLISH } from "~ipfsFileUpload/actions/constants"


export const publish = factoryTimedTry({
  fn: async (cid, key) => await IPFSClientService.client.name.publish(cid, { key }),
  action: ACTION_NAMEPUBLISH
})  as (cid: CID, key: string) => Promise<PublishResult | undefined>
