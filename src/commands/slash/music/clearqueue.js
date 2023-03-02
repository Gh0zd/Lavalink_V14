const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'clearqueue',
  description: 'Borra la cola',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    if (!player.queue.length) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('la cola está vacía');

      return interaction.reply({
        embeds: [embed],
      });
    }

    const { length } = player.queue;

    player.queue.clear();

    const embed = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`🆑 Borró [${length}] pista de la cola`);

    return interaction.reply({
      embeds: [embed],
    });
  },
};
