import { Client } from "discord.js"
import fs from "fs"
import request from "request"
import { insertThemeSong } from "./insertThemeSong"
export const listener = (client: Client) => {
  client.on("messageCreate", async (msg) => {
    if (msg.content === "$themesong") {
      // time is in milliseconds, so 5000 ms is equal to 5 seconds
      console.log(msg)
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
            insertThemeSong(msg.author.id, name)
            msg.channel.send(
              `New theme song added for ${await getUser(msg.author.id, client)}`
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

const getUser = async (id: string, client: Client) => {
  var user = await client.users.fetch(id)
  return user.username
}

// const checkVolume = (file) => {
//   var music = new Audio()

//   return music
// }
