const {Events} = require("discord.js");
module.exports = (client, logs_channel) => {
    const {ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
    const {guilds} = require("../config.json")
    const actionRow = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Przeszukaj drugiego discorda.").setStyle(ButtonStyle.Danger).setEmoji("🔁").setCustomId("trysecond"))
    const secondGuild = client.guilds.cache.get(guilds[1].guildId)
    client.on(Events.InteractionCreate, async interaction => {
        if(!interaction.isCommand() && !interaction.isButton()) return;
        if(interaction.customId === "trysecond"){
            const startTime = Date.now()
            const item = interaction.message.content.split(`"`)[1]
            const regex = new RegExp(item, "i");
            let channels = []
            secondGuild.channels.cache.forEach(async channel => {
                if (channel.type != ChannelType.GuildText) return;
                if (regex.test(channel.topic) || regex.test(channel.name)) {channels.push(channel);}
            });
            actionRow.components[0].setDisabled(true)
            await interaction.update({components: [actionRow]})
            if(channels.length==0) {await interaction.editReply({content: interaction.message.content+`\n\n\nNic nie zostało znalezione!`, ephemeral: true}); return;}
            else await interaction.editReply({content: interaction.message.content+`\n\n\nWyszukiwanie na ${secondGuild.name} dla: ${item}\nZnaleziono kanały:\n${channels.toString().split(',').join("\r\n")}\n[Kliknij tutaj, aby dołączyć do drugiej części discorda MedHolo EMS!](https://discord.gg/3Pp5tqHpcK)`, ephemeral: true});
            await logs_channel.send(`${interaction.member.user} wyszukał **"${item}"** na serwerze MedHolo EMS - 2!\nCzas odpowiedzi: ${Date.now()-startTime}ms`);
        }
        if(interaction.commandName == "find"){
            if(interaction.guild.id != guilds[0].guildId) {await interaction.reply({content: "Komendę można wykonać tylko na głównym discordzie MedHolo EMS.\n[Kliknij tutaj, aby dołączyć!](https://discord.gg/medholo-ems-986930829936717844)", ephemeral: true}); return; }
            const startTime = Date.now();
            let channels = []
            const item = interaction.options.getString("fraza").toLowerCase();
            const regex = new RegExp(item.replace(" ","|"), "i");
            interaction.guild.channels.cache.forEach(async channel => {
                if (channel.type != ChannelType.GuildText) return;
                if (regex.test(channel.topic) || regex.test(channel.name)) {channels.push(channel);}
            });
            actionRow.components[0].setDisabled(false)
            if(channels.length==0) {await interaction.reply({content: `Wyszukiwanie na ${interaction.guild.name} dla: "${item}"\nNic nie zostało znalezione!`, ephemeral: true, components: [actionRow]});}
            else await interaction.reply({content: `Wyszukiwanie na ${interaction.guild.name} dla: "${item}"\nZnaleziono kanały:\n${channels.toString().split(',').join("\r\n")}`,components: [actionRow], ephemeral: true});
            await logs_channel.send(`${interaction.member.user} wyszukał **"${item}"** na serwerze MedHolo EMS!\nCzas odpowiedzi: ${Date.now()-startTime}ms`);
        }
    });
}