import { Client } from "discord.js"
import fs from "fs"
import request from "request"
import { insertThemeSong } from "./insertThemeSong"
export const listener = (client: Client) => {
  client.on("messageCreate", (msg) => {
    if (msg.content === "$themesong") {
      var id = ""
      var fileName = ""
      msg.channel.send("Paste in that file")
      // time is in milliseconds, so 5000 ms is equal to 5 seconds
      const collector = msg.channel.createMessageCollector({ time: 10000 })
      collector.on("collect", async (file) => {
        if (!file.author.bot) {
          //console.log(file.attachments)
          if (
            [...file.attachments][0] &&
            [...file.attachments][0][1]["contentType"] === "audio/mpeg" &&
            [...file.attachments][0][1]["size"] <= 300000
          ) {
            try {
              const name = `${file.author.id}-themeSong.mp3`
              const mp3 = fs.createWriteStream(`./data/mp3s/${name}`)
              request
                .get([...file.attachments][0][1]["url"])
                .on("error", (err) => {
                  console.log(err)
                })
                .pipe(mp3)
              insertThemeSong(file.author.id, name)
              msg.channel.send(
                `New theme song added for ${await getUser(
                  file.author.id,
                  client
                )}`
              )

              return
            } catch (err) {
              console.log(err)
            }
          }
          console.log("that is not a file!")
        }
      })

      // insertThemeSong gets called before doing the above, but if I have it in the above code, it'll stop the app to refresh before the mp3 is fully downloaded causing the file to be corrupted AAAA
      // console.log(`USER: ${id}    FILE: ${fileName}`)
      // if (id !== "" && fileName !== "") insertThemeSong(id, fileName)
      // else {
      //   console.log("user not inserted")
      // }
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
