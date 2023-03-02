const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shuffle',
  description: 'Baraja la cola',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);


    if (player.queue.length <= 2) {
      const embed = new EmbedBuilder()
        .setColor(client.embed.dark)
        .setDescription("No se puede barajar la cola.");
      return interaction.reply({ embeds: [embed] });
    }

    player.queue.shuffle();

    const embed = new EmbedBuilder()
      .setColor(client.embed.dark)
      .setDescription('Barajó la cola');

    return interaction.reply({
      embeds: [embed],
    });
  },
};
