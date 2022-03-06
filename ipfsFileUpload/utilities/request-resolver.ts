import { Collection } from "./collection"


/* prepare a response body for transmission */
export const RESPONSE_DEFAULTS = {
  headers: {
    'Content-Type': 'application/json'
  },  
  isRaw: true,
}

export const requestResolver = (res: Collection) => 
  (template: Collection) => Object.assign(res, RESPONSE_DEFAULTS, template)