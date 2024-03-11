module.exports = (client) => {
    const {RESTEvents} = require("discord.js");
    const {logs_channelId, globalLogsChannelId, modLogsChannelId} = require("../config.json");
    const findCommand = require("../commands/findCommand.js");
    const onGuildMemberAdd = require("./onGuildMemberAdd.js");
    const sendCommand = require("../commands/sendCommand.js");
    let logs_channel;
    let globalLogsChannel;
    let modLogsChannel;
    const {Events, SlashCommandBuilder, ActivityType} = require("discord.js");
    client.once(Events.ClientReady, async () => {
        console.log(`Logged in as ${client.user.tag}`);
        console.log(`Bot działa na serwerach:`)
        client.guilds.cache.forEach(guild => {
            console.log(guild.name)
        });
        const find = new SlashCommandBuilder().setName("find").setDescription("Przeszukuje kanały w poszukiwaniu danej frazy.").addStringOption(option => option.setName("fraza").setDescription("Wyszukiwana fraza.").setRequired(true));
        const send = new SlashCommandBuilder().setName("send").setDescription("Wysyła wiadomość przez bota.").addStringOption(option => option.setName("message").setDescription("Wiadomość.").setRequired(true)).addChannelOption(option => option.setName("channel").setDescription("Kanał.").setRequired(true));
        client.guilds.cache.forEach(guild => {
            guild.commands.set([find,send])
        });
        logs_channel = client.channels.cache.get(logs_channelId)
        globalLogsChannel = client.channels.cache.get(globalLogsChannelId);
        modLogsChannel = client.channels.cache.get(modLogsChannelId);
        client.user.setPresence({
            activities: [{ name: `MedHolo EMS`, type: ActivityType.Playing}],
            status: "online"
          });
        findCommand(client, logs_channel, Events)
        onGuildMemberAdd(client, Events, globalLogsChannel, modLogsChannel);
        sendCommand(client);
    });
}