import { client } from '../config'

export const ACTION_ADD = 'action:add'

export const addFromBuffer = async (path, buffer) => {
  const before = new Date()

  const file = { path, content: buffer }

  const fileAdded = await client.add(file)
  const after = new Date()

  console.log({
    action: ACTION_ADD, 
    fileAdded, 
    completedOn: after,
    txDuration: after - before
  })

  return fileAdded[0]
}
