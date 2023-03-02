const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'resume',
  description: 'reanudar la pista',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);


    if (!player.isPaused) {
      const embed = new EmbedBuilder()
        .setColor(client.embed.dark)
        .setDescription('La Pista no se detiene');

      interaction.reply({
        embeds: [embed],
      });
    } else {
      const embed = new EmbedBuilder()
        .setColor(client.embed.dark)
        .setDescription('Reanudó la pista');

      player.pause(false);
      interaction.reply({
        embeds: [embed],
      });
    }
  },
};
