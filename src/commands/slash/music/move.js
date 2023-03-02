const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'jump',
  description: 'Mueve la posición de dos pistas',
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: 'track',
      description: 'La pista que desea mover.',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
    {
      name: 'position',
      description: 'Eliminar una pista de la cola.',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 2,
    },
  ],
  run: (client, interaction) => {
    function moveArrayElement(arr, fromIndex, toIndex) {
      arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
      return arr;
    }

    const player = client.poru.players.get(interaction.guild.id);

    const from = interaction.options.getNumber('track');
    const to = interaction.options.getNumber('position');

    if (
      from === to ||
      isNaN(from) ||
      from < 1 ||
      from > player.queue.length ||
      isNaN(to) ||
      to < 1 ||
      to > player.queue.length
    )
      return interaction.reply("Esa pista no existe en la cola.");

    const moved = player.queue[from - 1];
    moveArrayElement(player.queue, from - 1, to - 1);

    const embed = new EmbedBuilder()
      .setColor(client.embed.dark)
      .setDescription(`${client.emoji.MESSAGE.b} Se movió ${moved.info.title} a \`${to}\`.`);

    return interaction.reply({
      embeds: [embed],
    });
  },
};
