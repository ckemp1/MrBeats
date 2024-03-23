import { Client } from "discord.js"
import fs from "fs"
import request from "request"
import { spawn } from "child_process"
import { errorHandler } from "./errorHandler"
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
          const songName = `${msg.author.id}-themeSong.mp3`
          try {
            const mp3 = fs.createWriteStream(`./data/mp3s/${songName}`)
            request
              .get([...msg.attachments][0][1]["url"])
              .on("error", (error) => {
                errorHandler(error.message)
              })
              .pipe(mp3)
            // const execute = async (command: string) => await new Promise(resolve => exec(command, resolve))
            // const result = await execute(`my command`);

            // Broken no work, throws error - need to manually run normAllThemes for now
            // new Promise((resolve, reject) => {
            //   const pySpawn = spawn("python3", [
            //     "./scripts/normalizeSound.py",
            //     `./data/mp3s/${songName}`,
            //   ])
            //   pySpawn.stdout.on("data", (data) => {
            //     resolve(`stdout: ${data}`)
            //   })
            //   pySpawn.stderr.on("data", (data) => {
            //     reject(`stdout: ${data}`)
            //   })
            // })
            //   .then((data) => {
            //     console.log(data)
            //   })
            //   .catch((error) => {
            //     console.log(`promise error: ${error}`)
            //   })

            msg.channel.send(
              `New theme song added for ${
                (await client.users.fetch(msg.author.id)).username
              }`
            )
          } catch (error) {
            errorHandler(`Error alert: ${error}`)
          }
        }
      }
    }
  })
}
