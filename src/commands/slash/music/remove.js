const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'remove',
  description: '¡Retira una pista!',
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: 'track',
      description: 'Eliminar una pista de la cola.',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
  ],
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);


    const track = interaction.options.getNumber('track');

    if (track > player.queue.length) {
      const embed = new EmbedBuilder()
        .setColor(client.embed.dark)
        .setDescription('Pista no encontrada');

      return interaction.reply({ embeds: [embed] });
    }

    player.queue.remove(track - 1);

    const embed = new EmbedBuilder()
      .setColor(client.embed.dark)
      .setDescription('Pista eliminada de la cola');

    return interaction.reply({ embeds: [embed] });
  },
};
