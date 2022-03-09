import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { setClientURL } from "~ipfsFileUpload/services/ipfs-client.service"
import { setLogger } from "~ipfsFileUpload/services/log.service"


export interface HttpTrigerOptions {
  functionName: string, 
  fn: (context: Context, req: HttpRequest) => void,
  backendURL: string | URL
}

export const factoryHttpTrigger = 
    ({functionName, fn, backendURL}: HttpTrigerOptions) : AzureFunction => {
  return async function(context: Context, req: HttpRequest) {
    setLogger(context.log)
  
    setClientURL(backendURL)

    context.log(`[${functionName}] HTTP trigger function processed a request.`)
  
    await fn(context, req)
  }
}
