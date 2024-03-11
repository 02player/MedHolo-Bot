const {Client, GatewayIntentBits, RESTEvents} = require("discord.js");
const {token} = require("./config.json")
const onReady = require("./events/onReady.js")
const client = new Client({intents: [GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages,GatewayIntentBits.Guilds,GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages], restOptions: {timeout: 30000, retrives: 0}});
onReady(client);
client.rest.on(RESTEvents.Response, console.dir);
client.login(token);