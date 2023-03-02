const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'Pausa la cancion',
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);


    if (player.isPaused) {
      const embed = new EmbedBuilder()
        .setColor(client.embed.dark)
        .setDescription('El reproductor ya está en pausa');

      return interaction.reply({
        embeds: [embed],
      });
    }

    player.pause(true);

    const embed = new EmbedBuilder()
      .setColor(client.embed.dark)
      .setDescription('Pausó el reproductor');

    return interaction.reply({
      embeds: [embed],
    });
  },
};
