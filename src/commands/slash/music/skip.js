const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Salta la pista actual',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);


    player.stop();

    const embed = new EmbedBuilder()
      .setColor(client.embed.dark)
      .setDescription('Se saltó la pista actual');

    interaction.reply({ embeds: [embed] });
  },
};
