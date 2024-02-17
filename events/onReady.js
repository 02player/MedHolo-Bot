module.exports = (client) => {
    const {logs_channelId, welcome_channelId,secondWelcome_channelId} = require("../config.json");
    const findCommand = require("../commands/findCommand.js");
    const onGuildMemberAdd = require("./onGuildMemberAdd.js");
    const {Events, SlashCommandBuilder} = require("discord.js");
    var logs_channel;
    var welcome_channel;
    var secondWelcome_channel;
    client.on(Events.ClientReady, async () => {
        console.log(`Logged in as ${client.user.tag}`);
        console.log(`Bot działa na serwerach:`)
        client.guilds.cache.forEach(guild => {
            console.log(guild.name)
        });
        const find = new SlashCommandBuilder().setName("find").setDescription("Przeszukuje kanały w poszukiwaniu danej frazy.").addStringOption(option => option.setName("fraza").setDescription("Wyszukiwana fraza.").setRequired(true));
        client.application.commands.create(find);
        welcome_channel = client.channels.cache.get(welcome_channelId)
        secondWelcome_channel = client.channels.cache.get(secondWelcome_channelId)
        logs_channel = client.channels.cache.get(logs_channelId)
        findCommand(client, logs_channel, Events)
        onGuildMemberAdd(client, welcome_channel,secondWelcome_channel, Events)
    });
}