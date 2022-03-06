import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import 'module-alias/register'

import { add } from "./actions/add"
import { setLogger } from "./utilities/log.service"


/* entry point for the ipfsFileUpload function */
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    setLogger(context.log)
    context.log('[ipfsFileUpload] HTTP trigger function processed a request.')

    await add(context, req)
}
export default httpTrigger
