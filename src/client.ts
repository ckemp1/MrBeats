import DiscordJS, { Intents } from "discord.js"

export const client = new DiscordJS.Client({
  // tells discord what your bot intends to use and the information it needs such as reactions
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.MESSAGE_CONTENT,
  ],
})
