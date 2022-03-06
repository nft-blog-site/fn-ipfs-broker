import { client } from "~ipfsFileUpload/client"
import { LogService } from "~ipfsFileUpload/utilities/log.service"
import { ACTION_PIN } from "./constants"


export const pin = async hash => {
  const before: Date = new Date()

  try {
    const pinset = await client.pin.add(hash)
    const after: Date = new Date()

    LogService.logger({
      action: ACTION_PIN, 
      pinset, 
      completedOn: after,
      txDuration: Number(after) - Number(before)
    })

    return pinset
  } catch(err) {
    LogService.logger.error('[pin]', hash, err)
  }
}