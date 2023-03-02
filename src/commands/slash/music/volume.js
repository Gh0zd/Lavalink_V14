const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Establece el volumen del reproductor.',
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: 'volume',
      description: 'El volumen que desea configurar',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 0,
      max_value: 100,
    },
  ],
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);


    const volume = interaction.options.getNumber('volume', true);
    player.setVolume(volume);

    const embed = new EmbedBuilder()
      .setColor(client.embed.dark)
      .setDescription(`El volumen se ha establecido en: **${volume}%**.`);

    interaction.reply({
      embeds: [embed],
    });
  },
};
