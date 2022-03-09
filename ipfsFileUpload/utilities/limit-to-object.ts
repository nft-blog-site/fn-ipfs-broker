import { Collection } from "./collection"


/* trim a subject object to a template's properties */
export function limitToObject<T extends Collection> (
  subject: Partial<T>, 
  template: T
) {
  return Object.keys(template).reduce((o, key) => {
    if(subject.hasOwnProperty(key)) o[key] = subject[key]
    return o
  }, {})
}
