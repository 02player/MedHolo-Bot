module.exports = (client, welcome_channel, Events) => {
    client.on(Events.GuildMemberAdd, async member => {
        await welcome_channel.send(`Siema ${member.user}! Witamy na serwerze **MedHolo EMS**!\nMamy nadzieję, że zostaniesz z nami na dłużej. 🥼`)
    });
}