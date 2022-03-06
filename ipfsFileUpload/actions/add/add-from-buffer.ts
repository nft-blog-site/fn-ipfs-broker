import { LogService } from '~ipfsFileUpload/utilities/set-logger'
import { client } from '~ipfsFileUpload/client'
import { ACTION_ADD } from './constants'


export const addFromBuffer = async (path: string, buffer: Buffer) => {
  const before: Date = new Date()

  const file = { path, content: buffer }

  const fileAdded = await client.add(file)
  const after: Date = new Date()

  LogService.logger.log({
    action: ACTION_ADD, 
    fileAdded, 
    completedOn: after,
    txDuration: Number(after) - Number(before)
  })

  return fileAdded[0]
}
