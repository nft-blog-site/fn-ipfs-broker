import { Collection } from "./collection"


export function limitToObject<T extends Collection> (
  subject: Partial<T>, 
  template: T
) {
  return Object.keys(template).reduce((o, key) => {
    if(subject.hasOwnProperty(key)) o[key] = subject[key]
    return o
  }, {})
}
