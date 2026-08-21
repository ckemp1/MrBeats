import dotenv from "dotenv"

import { playThemeSong } from "./playThemeSong"
import { listener } from "./listener"
import { client } from "./client"

dotenv.config()

client.on("clientReady", () => {
  client.user!!.setActivity("Finally fixing this, or at least trying to")
  console.log("bot is ready!")
  listener(client)

  playThemeSong(client)
})

client.login(process.env.TOKEN)
