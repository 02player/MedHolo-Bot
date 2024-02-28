const {Events} = require("discord.js");
const {guilds} = require("../config.json")
module.exports = (client) => {
    client.on(Events.InteractionCreate, async interaction => {
        if(interaction.commandName != "send") return;
        if(!interaction.isCommand() || interaction.guild.id != guilds[0].guildId || !interaction.member.roles.cache.find(role => role.id === guilds[0].sendingMessagesRoleId)) {interaction.reply({content: "Błąd!",ephemeral: true}); return;}
        if(!interaction.options.getChannel("channel")) {interaction.reply({content: "Zły kanał!",ephemeral: true}); return;}
        interaction.options.getChannel("channel").send({content: interaction.options.getString("message")+""})
        interaction.reply({content: "Wiadomość!", ephemeral: true})
        return;
    })
}