import type { AddResult } from "ipfs-core-types/src/root"

import { IPFSClientService } from '~ipfsFileUpload/services/ipfs-client.service'
import { factoryTimedTry } from '~ipfsFileUpload/utilities/timed-try.factory'
import { ACTION_ADD } from '../constants'


export const add = factoryTimedTry({
  fn: async buffer => await IPFSClientService.client.add(buffer),
  action: ACTION_ADD
}) as (buffer: Buffer) => Promise<AddResult | undefined>
