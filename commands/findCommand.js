module.exports = (client, logs_channel,Events) => {
    const {ChannelType} = require("discord.js");
    const {secondGuildId} = require("../config.json")
    const secondGuild = client.guilds.cache.get(secondGuildId)
    client.on(Events.InteractionCreate, async interaction => {
        if(!interaction.isCommand()) return;
        if(interaction.commandName == "find"){
            const startTime = Date.now();
            let channels = []
            let secondChannels = []
            const item = interaction.options.getString("fraza").toLowerCase();
            interaction.guild.channels.cache.forEach(channel => {
                if (channel.type != ChannelType.GuildText) return;
                if((channel.topic.toLowerCase()+"").includes(item) || channel.name.toLowerCase().includes(item)){
                    channels.push(channel)
                }
            });
            secondGuild.channels.cache.forEach(channel => {
                if (channel.type != ChannelType.GuildText) return;
                if((channel.topic.toLowerCase()+"").includes(item) || channel.name.toLowerCase().includes(item)){
                    secondChannels.push(channel)
                }
            });
            await logs_channel.send(`${interaction.member.user} wyszukał **"${item}"** na serwerze MedHolo!\nCzas odpowiedzi: ${Date.now()-startTime}ms`);
            if(channels.length==0) {await interaction.reply({content: `Nic nie zostało znalezione!`, ephemeral: true}); return;}
            await interaction.reply({content: `Znaleziono kanały:\n${channels.toString().split(',').join("\r\n")}\nZnaleziono pasujące kanały również na drugim discordzie:\n${secondChannels.toString().split(',').join("\r\n")}\n[Kliknij, aby dołączyć do drugiej części discorda MedHolo EMS!](https://discord.gg/3Pp5tqHpcK)`, ephemeral: true})
            return;
        }
    });
}