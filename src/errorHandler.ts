import { Message, TextChannel } from "discord.js"
import { client } from "./client"

/**
 *
 * @param error The error message to be logged
 * @param optionalMessage Optional argument for sending error to provided channel used with prior $themesong call. Note this disables logging to log channel
 * @returns
 */
export const errorHandler = (
  error: string,
  optionalMessage?: Message<boolean>
) => {
  if (!client) return
  if (optionalMessage) {
    optionalMessage.channel.send(
      `Theme song could NOT be added for ${
        optionalMessage.author.username
      }!\n${error.toString()}\n`
    )
  } else {
    const logChannel = client.channels.cache.get(
      "1175674896139952200"
    ) as TextChannel
    logChannel.send(error)
  }
}
