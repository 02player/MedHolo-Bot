module.exports = (client, Events, joinLogsChannel) => {
    client.on(Events.GuildMemberAdd, async member => {
        console.log(member.user+" joined "+member.guild.name)
        const voicememberstatechannel = member.guild.channels.cache.find(channel => channel.name.includes('Uczniowie'));
        if(voicememberstatechannel) voicememberstatechannel.setName(`Uczniowie🥼: ${member.guild.memberCount}`);
        member.guild.systemChannel.send({content: `Siema ${member.user}! Witamy na serwerze **${member.guild.name}**!\nMamy nadzieję, że zostaniesz z nami na dłużej. 🥼`});
        joinLogsChannel.send({content: `${member.user} joined ${member.guild.name}`});
        return;
    });
}