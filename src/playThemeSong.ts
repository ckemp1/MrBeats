import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
} from "@discordjs/voice"
import fs from "fs"
import { Client } from "discord.js"
import { errorHandler } from "./errorHandler"

/**
 * STUFF TO DO
 * ID each of the new users that want a themesong:
 *    - When a user requests a valid mp3
 *      - If new:
 *        - Create a new User; store under json file to start, and maybe use sqlite in the future
 *      - Tag the id from the message author's id onto the themesong file name Ex: 123123123-themesong.mp3
 *      - themesong.ts should point towards the storage (again either using a json file or sqlite) for that user. In this case
 *          it would be if song.includes(user.id) then use that mp3 file
 */

export const playThemeSong = (client: Client) => {
  client.on("voiceStateUpdate", async (oldMember, newMember) => {
    let channel = newMember.channel
    // only play when a user joins the chat, not when you mute or deafen
    if (channel !== null && channel.isVoice) {
      var user = await client.users.fetch(oldMember.member.user.id)
      if (
        user.id === newMember.member.user.id &&
        oldMember.channelId === null &&
        !newMember.member.user.bot
      ) {
        try {
          const audioPlayer = createAudioPlayer()
          // fails when trying to join without a themesong, should just work fine and not have the bot join
          // if readFile finds nothing, return
          var readFile = fs.createReadStream(
            `./data/mp3s/${user.id}-themeSong.mp3`
          )

          const resource = createAudioResource(
            // need npm i ffmpeg-static to read audio files or something
            readFile
          )
          readFile.on("ready", () => {
            const connection = joinVoiceChannel({
              channelId: newMember.member.voice.channelId,
              guildId: newMember.member.guild.id,
              adapterCreator: newMember.member.guild
                .voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
            })

            audioPlayer.play(resource)

            connection.subscribe(audioPlayer)

            audioPlayer.on(AudioPlayerStatus.Idle, () => {
              connection.disconnect()
              connection.destroy()
            })
          })
        } catch (err) {
          console.log("themesong broke?")
          errorHandler(err)
        }
        return
      }
    } else {
    }
  })
}
