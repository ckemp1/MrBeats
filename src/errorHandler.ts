import { TextChannel } from "discord.js"
import { client } from "./client"

export const errorHandler = (error: string) => {
  if (!client) return
  ;(client.channels.cache.get("1175674896139952200") as TextChannel).send(error)
}
