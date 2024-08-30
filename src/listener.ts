import { Client, User } from "discord.js"
import fs from "fs"
import request from "request"
import { spawn } from "child_process"
import { errorHandler } from "./errorHandler"
import { getUser } from "./userUtils"

export const listener = (client: Client) => {
  client.on("messageCreate", async (msg) => {
    let user: User | false
    if (msg.content.includes("$themesong")) {
      // time is in milliseconds, so 5000 ms is equal to 5 seconds
      if (!msg.author.bot) {
        let songDir =
          process.env.NODE_ENV === "dev" ? "./data/dev/mp3s" : "./data/mp3s"
        try {
          if (
            [...msg.attachments][0] &&
            [...msg.attachments][0][1]["contentType"] === "audio/mpeg"
          ) {
            const isOwner = msg.author.id === "131593064216133632"
            if (isOwner) {
              // If I want to override another user's themesong
              user = await getUser(msg.content.split(" ")[1])
              if (user) msg.author = user
            }

            // also change songName to use username instead of userId, hard to track what is what
            //  would need to figure out way to remove old themesongs if user changes their username; wouldn't be able to look for that username

            const songName = `${msg.author.id}-themeSong.mp3`
            const mp3 = fs.createWriteStream(`${songDir}/${songName}`)
            request
              .get([...msg.attachments][0][1]["url"])
              .on("error", (err) => {
                errorHandler(err.message)
              })
              .pipe(mp3)
              .on("finish", () => {
                const pySpawn = spawn("python3", [
                  "./scripts/normalizeSound.py",
                  `${songDir}/${songName}`,
                ])
                pySpawn.stdout.on("data", (data: string) => {
                  if (isNaN(Number(data))) {
                    errorHandler(
                      `The data returned is not a number! Data returned: ${data.toString()}`
                    )
                    return
                  } else if (Number(data) > 7) {
                    errorHandler(
                      `Gah damn it bobby, the mp3 file needs to be less than 7 seconds long, yours is ${Number(
                        data
                      ).toFixed(2)} seconds!`,
                      msg
                    )
                    return
                  }
                  msg.channel.send(
                    `New theme song added for ${msg.author.username}`
                  )
                })
                pySpawn.stderr.on("data", (data) => {
                  errorHandler(data.toString())
                })
              })
          } else {
            // maybe unecessary to throw error and log it, maybe just return and send the error message
            errorHandler(
              "What you want me to do with no gah dang mp3 file attached to this???",
              msg
            )
            msg.channel.send(
              "https://tenor.com/view/epic-embed-fail-ryan-gosling-cereal-embed-failure-laugh-at-this-user-gif-20627924"
            )
          }
        } catch (err) {
          errorHandler(err.toString(), msg)
        }
      }
    }
  })
}
