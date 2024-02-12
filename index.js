const {Client, Events, GatewayIntentBits, SlashCommandBuilder, ChannelType} = require("discord.js");
const {token, logs_channelId, welcome_channelId} = require("./config.json")
const client = new Client({intents: [GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages,GatewayIntentBits.Guilds,GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers]});

var logs_channel;
var welcome_channel;

client.on(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);
    logs_channel = client.channels.cache.get("1206210285380304926");
    welcome_channel = client.channels.cache.get("1002664900746825882");
    const find = new SlashCommandBuilder().setName("find").setDescription("Przeszukuje kanały w poszukiwaniu danej frazy.").addStringOption(option => option.setName("fraza").setDescription("Wyszukiwana fraza.").setRequired(true));
    client.application.commands.create(find);
});
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isCommand()) return;
    if(interaction.commandName == "find"){
        const startTime = Date.now();
        let channels = []
        const item = interaction.options.getString("fraza");
        interaction.guild.channels.cache.forEach(channel => {
            if (channel.type != ChannelType.GuildText) return;
            if((channel.topic+"").includes(item) || channel.name.includes(item)){
                channels.push(channel)
            }
        });
        await logs_channel.send(`${interaction.member.user} wyszukał **"${item}"** na serwerze MedHolo!\nCzas odpowiedzi: ${Date.now()-startTime}ms`);
        if(channels.length==0) {await interaction.reply({content: `Nic nie zostało znalezione!`, ephemeral: true}); return;}
        await interaction.reply({content: `Znaleziono kanały:\n${channels.toString().split(',').join("\r\n")}`, ephemeral: true})
        return;
    }
});
client.on(Events.GuildMemberAdd, async member => {
    await welcome_channel.send(`Siema ${member.user}! Witamy na serwerze **MedHolo EMS**!\nMamy nadzieję, że zostaniesz z nami na dłużej. 🥼`)
});
client.login(token);