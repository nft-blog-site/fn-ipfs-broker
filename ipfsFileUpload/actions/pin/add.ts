import { CID } from "ipfs-http-client"

import { IPFSClientService } from "~ipfsFileUpload/services/ipfs-client.service"
import { factoryTimedTry } from "~ipfsFileUpload/utilities/timed-try.factory"
import { ACTION_PIN } from "../constants"


export const pinAdd = factoryTimedTry({
  fn: async cid => await IPFSClientService.client.pin.add(cid),
  action: ACTION_PIN
}) as (cid: CID) => Promise<CID | undefined>
