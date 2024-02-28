module.exports = (client) => {
    const {logs_channelId, joinLogsChannelId} = require("../config.json");
    const findCommand = require("../commands/findCommand.js");
    const onGuildMemberAdd = require("./onGuildMemberAdd.js");
    const sendCommand = require("../commands/sendCommand.js");
    const {Events, SlashCommandBuilder, ActivityType} = require("discord.js");
    var logs_channel;
    client.once(Events.ClientReady, event => {
        console.log(`Logged in as ${client.user.tag}`);
        console.log(`Bot działa na serwerach:`)
        client.guilds.cache.forEach(guild => {
            console.log(guild.name)
        });
        const find = new SlashCommandBuilder().setName("find").setDescription("Przeszukuje kanały w poszukiwaniu danej frazy.").addStringOption(option => option.setName("fraza").setDescription("Wyszukiwana fraza.").setRequired(true));
        const send = new SlashCommandBuilder().setName("send").setDescription("Wysyła wiadomość przez bota.").addStringOption(option => option.setName("message").setDescription("Wiadomość.").setRequired(true)).addChannelOption(option => option.setName("channel").setDescription("Kanał.").setRequired(true));
        client.guilds.cache.forEach(guild => {
            guild.commands.set([])
            guild.commands.create(find);
            guild.commands.create(send);
        });
        logs_channel = client.channels.cache.get(logs_channelId)
        joinLogsChannel = client.channels.cache.get(joinLogsChannelId);
        client.user.setPresence({
            activities: [{ name: `MedHolo EMS`, type: ActivityType.Playing}],
            status: "online"
          });
        findCommand(client, logs_channel, Events)
        onGuildMemberAdd(client, Events, joinLogsChannel);
        sendCommand(client);
    });
}