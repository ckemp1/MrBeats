import { client } from "./client"
import { errorHandler } from "./errorHandler"

// future task, host users on db and fetch from there if the user exists, else use discord.js api
export const getUser = async (userId: string) => {
  if (userId === undefined || userId === " ") return false
  try {
    const user = await client.users.fetch(userId)
    return user ? user : false
  } catch (err) {
    throw new Error(`${err.toString()} ${userId}`)
  }
}
