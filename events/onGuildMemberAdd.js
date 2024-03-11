const {minimalDaysOfAccount} = require("../config.json")

module.exports = (client, Events, globalLogsChannel, modLogsChannel) => {
    client.on(Events.GuildMemberAdd, async member => {
        console.log(member.user+" joined "+member.guild.name+" with "+member.user.createdAt)
        if ((Date.now()-member.user.createdAt) < (1000*60*60*24*minimalDaysOfAccount)) {
            await member.kick("Zbyt niedawno stworzone konto."); 
            await member.send("Twoje konto discord zostało stworzone mniej niż 3 dni temu.")
            await modLogsChannel.send({content: `**KICK**\nUżytkownik ${member.user} został wyrzucony, ponieważ posiada konto discord mniej niż 3 dni.`});
        }
        const voicememberstatechannel = await member.guild.channels.cache.find(channel => channel.name.includes('Uczniowie'));
        if(voicememberstatechannel) await voicememberstatechannel.setName(`Uczniowie🥼: ${member.guild.memberCount}`);
        if(globalLogsChannel) await globalLogsChannel.send({content: `${member.user} joined ${member.guild.name}`});
        const welcomeChannel = await member.guild.channels.cache.find(channel => channel.name.includes("nowe-osoby"))
        if(welcomeChannel) await welcomeChannel.send({content: `Siema ${member.user}! Witamy na serwerze **${member.guild.name}**!\nMamy nadzieję, że zostaniesz z nami na dłużej. 🥼`, embed: { fields: [{}, {}, {}] } });
    });
}