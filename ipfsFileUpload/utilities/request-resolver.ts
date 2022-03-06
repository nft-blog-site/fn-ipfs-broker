import { Collection } from "./collection"


export const requestResolver = (res: Collection) => 
  (template: Collection) => Object.assign(res, template)