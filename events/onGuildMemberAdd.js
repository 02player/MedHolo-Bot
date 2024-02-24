const {guilds} = require("../config.json")
module.exports = (client, Events) => {
    const firstGuildVoiceMemberState = client.channels.cache.get(guilds[0].voiceMemberStateId)
    const secondGuildVoiceMemberState = client.channels.cache.get(guilds[1].voiceMemberStateId)
    const welcome_channel = client.channels.cache.get(guilds[0].welcome_channelId)
    const secondWelcome_channel = client.channels.cache.get(guilds[1].welcome_channelId)
    client.on(Events.GuildMemberAdd, member => {
        if(member.guild.id == guilds[0].guildId) {
            welcome_channel.send({content: `Siema ${member.user}! Witamy na serwerze **${member.guild.name}**!\nMamy nadzieję, że zostaniesz z nami na dłużej. 🥼`}); 
            firstGuildVoiceMemberState.setName(`Uczniowie🥼: ${member.guild.memberCount}`);
            return;
        }
        if(member.guild.id == guilds[1].guildId) {
            secondWelcome_channel.send({content: `Siema ${member.user}! Witamy na serwerze **${member.guild.name}**!\nMamy nadzieję, że zostaniesz z nami na dłużej. 🥼`}); 
            secondGuildVoiceMemberState.setName(`Uczniowie🥼: ${member.guild.memberCount}`);
            return;
        }
    });
}