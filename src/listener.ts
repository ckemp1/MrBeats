import { Client } from "discord.js"
import fs from "fs"
import { Readable } from "node:stream"
import { spawn } from "child_process"
import { errorHandler } from "./errorHandler"
export const listener = (client: Client) => {
  client.on("messageCreate", async (msg) => {
    if (msg.content.includes("$themesong")) {
      // time is in milliseconds, so 5000 ms is equal to 5 seconds
      if (!msg.author.bot) {
        const attachments = [...msg.attachments][0]
        if (
          attachments[1] &&
          attachments[1]["contentType"] === "audio/mpeg3"
          // TODO get the actual length of the mp3 file, size != audio length
          // [...msg.attachments][0][1]["size"] <= 300000
        ) {
          const songName = `${msg.author.id}-themeSong.mp3`
          try {
            const mp3 = fs.createWriteStream(`./data/mp3s/${songName}`)
            const data = await fetch(attachments[1]["url"])

            if (!data.ok) {
              errorHandler(`Error alert: ${data.statusText}`)
            }

            // TODO data.body typing mismatch
            Readable.fromWeb(data.body as any).pipe(mp3)
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
              }`,
            )
          } catch (error) {
            errorHandler(`Error alert: ${error}`)
          }
        } else {
          msg.channel.send("The provided file is not an mp3")
        }
      }
    }
  })
}
