import DiscordJS, { GatewayIntentBits } from "discord.js"

export const client = new DiscordJS.Client({
  // tells discord what your bot intends to use and the information it needs such as reactions
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
})
