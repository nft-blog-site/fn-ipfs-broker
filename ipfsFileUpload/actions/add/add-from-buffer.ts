import { LogService } from '~ipfsFileUpload/utilities/log.service'
import { client } from '~ipfsFileUpload/client'
import { ACTION_ADD } from './constants'


/* post file data to ipfs client */
export const addFromBuffer = async (path: string, buffer: Buffer) => {
  const before: Date = new Date()

  const file = { path, content: buffer }

  try {
    const fileAdded = await client.add(file)
    const after: Date = new Date()

    LogService.logger({
      action: ACTION_ADD, 
      fileAdded, 
      completedOn: after,
      txDuration: Number(after) - Number(before)
    })
  
    return fileAdded  
  } catch(error) {
    LogService.logger.error('[addFromBuffer] error', error)
  }
}
