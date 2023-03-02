const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'seek',
  description: 'Buscar la pista',
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  options: [
    {
      name: 'position',
      description: 'Nueva posición de la pista',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 0,
    },
  ],
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    const position = interaction.options.getNumber('position', true);

    if (!player.currentTrack.info.isSeekable) {
      const embed = new EmbedBuilder()
        .setColor(client.embed.dark)
        .setDescription('La pista no se puede buscar');

      interaction.reply({
        embeds: [embed],
      });
    } else {
      player.seekTo(position * 1000);

      const embed = new EmbedBuilder()
        .setColor(client.embed.dark)
        .setDescription(`Buscó ${position}`);

      return interaction.reply({
        embeds: [embed],
      })
    }
  },
};