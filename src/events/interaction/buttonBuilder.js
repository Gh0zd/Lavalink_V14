const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require('../../index');

module.exports = {
    name: "buttonBuilder"
};

client.on("interactionCreate", async interaction => { 
    if (!interaction.isButton()) return;
    const player = client.poru.players.get(interaction.guild.id);

    if (interaction.customId === 'controlpanel') {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('shuffle')
                    .setEmoji(`🔀`)
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('volume-')
                    .setEmoji(`🔉`)
                    .setStyle(ButtonStyle.Danger),

                new ButtonBuilder()
                    .setCustomId('p/p')
                    .setEmoji(`▶`)
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('volume+')
                    .setEmoji(`🔊`)
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('skip')
                    .setEmoji(`⏭`)
                    .setStyle(ButtonStyle.Secondary),
            );

        const embed = new EmbedBuilder()
            .setColor(client.embed.dark)
            .setImage('https://cdn.discordapp.com/attachments/878699197581393950/972716362696904724/297907B1-D9B3-434D-97DB-DC914EA93FC2.gif')

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
    }

    if (interaction.customId === "shuffle") {
        try {
            if (player.queue.length <= 2) {
                const embed = new EmbedBuilder()
                    .setColor(client.embed.dark)
                    .setDescription("🔀 No puedo barajar la cola.");
                return interaction.reply({ embeds: [embed], ephemeral: true })
            }

            player.queue.shuffle();

            const embed = new EmbedBuilder()
                .setColor(client.embed.dark)
                .setDescription('🔀 Barajó la cola');

            interaction.reply({ embeds: [embed], ephemeral: true })
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No existe ningún reproductor para este servidor.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'volume-') {
        try {
            player.setVolume("10");
            const embed = new EmbedBuilder()
                .setColor(client.embed.dark)
                .setDescription(`🔉 El volumen se ha establecido en: **10%**.`);
            return interaction.reply({ embeds: [embed], ephemeral: true })
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No existe ningún reproductor para este servidor.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'volume+') {
        try {
            player.setVolume("100");
            const embed = new EmbedBuilder()
                .setColor(client.embed.dark)
                .setDescription(`🔊 Volume has been set to **100%**.`);
            return interaction.reply({ embeds: [embed], ephemeral: true })
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No existe ningún reproductor para este servidor.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'p/p') {
        try {
            if (player.isPaused) {
                player.pause(false);
                const embed = new EmbedBuilder()
                    .setColor(client.embed.dark)
                    .setDescription('⏸ La canción ha sido reanudada.');

                interaction.reply({ embeds: [embed], ephemeral: true })
            } else {
                player.pause(true);

                const embed = new EmbedBuilder()
                    .setColor(client.embed.dark)
                    .setDescription('⏸ La canción ha sido pausada.');

                interaction.reply({ embeds: [embed], ephemeral: true })
            }
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No existe ningún reproductor para este servidor.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'skip') {
        try {
            player.stop();

            const embed = new EmbedBuilder()
                .setColor(client.embed.dark)
                .setDescription('⏭ Se saltó la pista actual');

            await interaction.reply({ embeds: [embed], components: [], ephemeral: true })
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No existe ningún reproductor para este servidor.`, ephemeral: true })
        }
    }
})