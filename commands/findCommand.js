module.exports = (client, logs_channel,Events) => {
    const {ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionType} = require("discord.js");
    const {firstGuildId, secondGuildId} = require("../config.json")
    const actionRow = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Przeszukaj drugiego discorda.").setStyle(ButtonStyle.Danger).setEmoji("🔁").setCustomId("trysecond"))
    const secondGuild = client.guilds.cache.get(secondGuildId)
    client.on(Events.InteractionCreate, async interaction => {
        if(!interaction.isCommand() && !interaction.isButton()) return;
        if(interaction.customId === "trysecond"){
            const item = interaction.message.content.split(`"`)[1]
            let secondChannels = []
            secondGuild.channels.cache.forEach(async channel => {
                if (channel.type != ChannelType.GuildText) return;
                if((channel.topic+"").includes(item) || channel.name.toLowerCase().includes(item)){
                    await secondChannels.push(channel)
                }
            });
            if(secondChannels.length==0) {await interaction.reply({content: `Nic nie zostało znalezione!`, ephemeral: true}); return;}
            else await interaction.reply({content: `Wyszukiwanie na ${secondGuild.name} dla: ${item}\nZnaleziono kanały:\n${secondChannels.toString().split(',').join("\r\n")}\n[Kliknij tutaj, aby dołączyć do drugiej części discorda MedHolo EMS!](https://discord.gg/3Pp5tqHpcK)`, ephemeral: true});
        }
        if(interaction.commandName == "find"){
            if(interaction.guild.id != firstGuildId) {await interaction.reply({content: "Komendę można wykonać tylko na głównym discordzie MedHolo EMS.\n[Kliknij tutaj, aby dołączyć!](https://discord.gg/medholo-ems-986930829936717844)", ephemeral: true}); return; }
            const startTime = Date.now();
            let channels = []
            const item = interaction.options.getString("fraza").toLowerCase();
            interaction.guild.channels.cache.forEach(async channel => {
                if (channel.type != ChannelType.GuildText) return;
                if((channel.topic+"").includes(item) || channel.name.toLowerCase().includes(item)){
                    await channels.push(channel)
                }
            });
            if(channels.length==0) {await interaction.reply({content: `Nic nie zostało znalezione!`, ephemeral: true});}
            else await interaction.reply({content: `Wyszukiwanie na ${interaction.guild.name} dla: "${item}"\nZnaleziono kanały:\n${channels.toString().split(',').join("\r\n")}`,components: [actionRow], ephemeral: true});
            await logs_channel.send(`${interaction.member.user} wyszukał **"${item}"** na serwerze MedHolo!\nCzas odpowiedzi: ${Date.now()-startTime}ms`);
        }
    });
}