import { generate } from "./generate"
import { list } from "./list"

export const getKey = async name => {
  const keys = await list()
  return keys.find(key => key.name === name) ?? generate(name)
}