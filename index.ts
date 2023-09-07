import DiscordJS, { Intents, TextChannel } from "discord.js"
import dotenv from "dotenv"

import { playThemeSong } from "./playThemeSong"
import { listener } from "./listener"
const client = new DiscordJS.Client({
  // tells discord what your bot intends to use and the information it needs such as reactions
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.MESSAGE_CONTENT,
  ],
})

dotenv.config()
// const pool = mariadb.createPool({
//   host: 'raspberrypi',
//   user: 'user',
//   password: 'Password123!',
// })
client.on("ready", () => {
  client.user!!.setActivity("I can hear you")
  console.log("bot is ready!")
  listener(client)
  playThemeSong(client)
})

client.login(process.env.TOKEN)
