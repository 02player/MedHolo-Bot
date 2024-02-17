module.exports = (client, welcome_channel,secondWelcome_channel, Events) => {
    const {firstGuildId, secondGuildId} = require("../config.json")
    client.on(Events.GuildMemberAdd, async member => {
        if(member.guild.id == firstGuildId) welcome_channel.send(`Siema ${member.user}! Witamy na serwerze **MedHolo EMS**!\nMamy nadzieję, że zostaniesz z nami na dłużej. 🥼`);
        if(member.guild.id == secondGuildId) secondWelcome_channel.send(`Siema ${member.user}! Witamy na serwerze **MedHolo EMS - 2**!\nMamy nadzieję, że zostaniesz z nami na dłużej. 🥼`);
    });
}