const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'disconnect',
  description: 'Desconecta el bot de tu canal de voz',
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guildId);

    player.destroy();

    const embed = new EmbedBuilder()
      .setColor(client.embed.dark)
      .setDescription('📡Desconectad@');

    return interaction.reply({
      embeds: [embed],
    });
  },
};
