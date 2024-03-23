import dotenv from "dotenv"

import { playThemeSong } from "./playThemeSong"
import { listener } from "./listener"
import { client } from "./client"

dotenv.config()

client.on("ready", () => {
  client.user!!.setActivity("I can hear you")
  console.log("bot is ready!")
  listener(client)

  playThemeSong(client)
})

client.login(process.env.TOKEN)
