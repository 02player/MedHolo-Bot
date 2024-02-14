const {Client, GatewayIntentBits} = require("discord.js");
const {token} = require("./config.json")
const onReady = require("./events/onReady.js")
const client = new Client({intents: [GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages,GatewayIntentBits.Guilds,GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers]});
onReady(client);
client.login(token);