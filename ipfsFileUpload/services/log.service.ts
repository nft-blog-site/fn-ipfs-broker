/* ensure the Azure context.log is available */
export const LogService: {logger: any} = {
  logger: console
}

export function setLogger(logger: any) {
  LogService.logger = logger
}
