import { LogService } from "../services/log.service"


export interface TimedTrial {
  action: string
  fn: Function
}

export const factoryTimedTry = ({fn, action}: TimedTrial) => {
  return async function () { 
    const before: Date = new Date()
    let after: Date

    let result
    try {
      result = await fn(...arguments)
      after = new Date()
    } catch(err) {
      LogService.logger.error(`[${action}]`, err)
      return
    }

    LogService.logger({
      action, 
      result, 
      completedOn: after,
      txDuration: Number(after) - Number(before)
    })
  
    return result
  }  
}
