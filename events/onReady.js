module.exports = (client) => {
    const {logs_channelId} = require("../config.json");
    const findCommand = require("../commands/findCommand.js");
    const onGuildMemberAdd = require("./onGuildMemberAdd.js");
    const {Events, SlashCommandBuilder, ActivityType} = require("discord.js");
    var logs_channel;
    client.once(Events.ClientReady, async () => {
        console.log(`Logged in as ${client.user.tag}`);
        console.log(`Bot działa na serwerach:`)
        client.guilds.cache.forEach(guild => {
            console.log(guild.name)
        });
        console.log(`Zablokowane słowa:`)
        const find = new SlashCommandBuilder().setName("find").setDescription("Przeszukuje kanały w poszukiwaniu danej frazy.").addStringOption(option => option.setName("fraza").setDescription("Wyszukiwana fraza.").setRequired(true));
        client.application.commands.create(find);
        const automod = new SlashCommandBuilder().setName("automod").setDescription("Dodaje/Usuwa zakazane słowo do automoda.").addStringOption(option => option.setName("fraza").setDescription("Fraza do zablokowania/odblokowania.").setRequired(true));
        client.application.commands.create(automod)
        logs_channel = client.channels.cache.get(logs_channelId)
        client.user.setPresence({
            activities: [{ name: `MedHolo EMS`, type: ActivityType.Playing}],
            status: "online"
          });
        findCommand(client, logs_channel, Events)
        onGuildMemberAdd(client, Events)
    });
}