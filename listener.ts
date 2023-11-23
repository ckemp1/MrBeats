import { Client } from "discord.js"
import fs from "fs"
import request from "request"
import { execSync } from "child_process"
export const listener = (client: Client) => {
  client.on("messageCreate", async (msg) => {
    if (msg.content === "$themesong") {
      // time is in milliseconds, so 5000 ms is equal to 5 seconds
      if (!msg.author.bot) {
        if (
          [...msg.attachments][0] &&
          [...msg.attachments][0][1]["contentType"] === "audio/mpeg" &&
          [...msg.attachments][0][1]["size"] <= 300000
        ) {
          try {
            const name = `${msg.author.id}-themeSong.mp3`
            const mp3 = fs.createWriteStream(`./data/mp3s/${name}`)
            request
              .get([...msg.attachments][0][1]["url"])
              .on("error", (err) => {
                console.log(err)
              })
              .pipe(mp3)

            execSync(`python ./normalizeSound.py ./data/mp3s/${name}`)

            msg.channel.send(
              `New theme song added for ${
                (await client.users.fetch(msg.author.id)).username
              }`
            )

            return
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
  })
}
