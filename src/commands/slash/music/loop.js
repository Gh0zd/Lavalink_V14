const { EmbedBuilder, CommandInteraction,  AttachmentBuilder, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Canvas, loadImage } = require('canvas-constructor/cairo');
const path = require('path');
module.exports = {
  name: 'loop',
  description: 'Establecer el modo de bucle en la pista actual',
  inVc: true,
  sameVc: true,
  player: true,
  current: true,

  /**
  * @param {Client} client 
  * @param {CommandInteraction} interaction
  */
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    //canvas
   let background = await loadImage(path.resolve(__dirname, `${process.cwd()}/src/All_Files/bot.png`)); 
   let avatar = await loadImage(client.user.displayAvatarURL({  extension: 'jpg' , size: 512 }));
   let ctx = new Canvas(background.width, background.height)
      .printImage(background, 0, 0, background.width, background.height) 
      .printCircularImage(avatar, 129, 125, 112) 
      .toBuffer(); 
 let attachment = new AttachmentBuilder(ctx, { name: "bot.png" }); // لا تعدل
        //fin canvas
    const enable = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('enable').setLabel('Loop Habilitar').setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId('track').setLabel('Loop Pista').setStyle(ButtonStyle.Primary).setDisabled(true),

        new ButtonBuilder()
          .setCustomId('queue').setLabel('Loop Cola').setStyle(ButtonStyle.Primary).setDisabled(true)
      )

    const disable = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('disable').setLabel('Loop Deshabilitar').setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
          .setCustomId('track').setLabel('Loop Pista').setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId('queue').setLabel('Loop Cola').setStyle(ButtonStyle.Primary)
      )

    const enableembed = new EmbedBuilder()
      .setImage('attachment://bot.png')
      .setColor(client.embed.dark)

    const collector = interaction.channel.createMessageComponentCollector({ filter: (i) => (i?.isButton()) && i?.user && i?.message.author.id == client.user.id, time: 60000 });

    interaction.reply({
      files: [attachment],
      embeds: [enableembed],
      components: [enable]
    })

    collector.on('collect', async i => {
      if (i.user.id !== interaction.user.id)
        return i.reply({ content: `¡No está permitido usar botones para este mensaje!`, ephemeral: true });

      if (i.customId === 'enable') {
        const embed = new EmbedBuilder()
          .setImage('attachment://bot.png')
          .setColor(client.embed.dark)

        i.update({
          files: [attachment],
          embeds: [embed],
          components: [disable]
        })
      }

      if (i.customId === 'disable') {
        player.setLoop("NONE")
        const embed = new EmbedBuilder()
          .setImage('attachment://bot.png')
          .setColor(client.embed.dark)

        i.update({
          files: [attachment],
          embeds: [embed],
          components: [enable]
        })
      }

      if (i.customId === 'track') {
        player.setLoop("TRACK")

        const embed = new EmbedBuilder()
          .setDescription(`${client.emoji.MESSAGE.a} **${interaction.member.displayName}** Cambiado al modo de bucle de pista`)
          .setColor(client.embed.dark)

        i.reply({
          embeds: [embed]
        }).then(setTimeout(() => i.deleteReply(), 5000))
      }

      if (i.customId === 'queue') {
        player.setLoop("QUEUE")

        const embed = new EmbedBuilder()
          .setDescription(`${client.emoji.MESSAGE.a} **${interaction.member.displayName}** Cambiado al modo de bucle de cola`)
          .setColor(client.embed.dark)

        i.reply({
          embeds: [embed]
        }).then(setTimeout(() => i.deleteReply(), 5000))
      }
    })
  }
};