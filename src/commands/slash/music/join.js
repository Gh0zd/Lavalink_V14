const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'join',
  description: 'Se une a tu canal de voz',
  inVc: true,
  run: (client, interaction) => {
    client.poru.createConnection({
      guildId: interaction.guild.id,
      voiceChannel: interaction.member.voice.channel.id,
      textChannel: interaction.channel.id,
      deaf: true,
    });

    const embed = new EmbedBuilder()
      .setColor(client.embed.dark)
      .setDescription(`${client.emoji.MESSAGE.b} Unido ${interaction.member.voice.channel.toString()}`);

    return interaction.reply({
      embeds: [embed],
    });
  },
};
