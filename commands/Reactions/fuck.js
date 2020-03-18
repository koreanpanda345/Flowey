const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "fuck",
  aliases: "fuck, hold, handhold",
  description: "Holdin hands holds is so much more significant than you can possible imagine",
  hasArgs: true,
  args: "umu",
  usage: "<@who>",
  category: "Reactions",
  async execute(client, message, args) {
    
    const fuckimg = [
      "https://i.pinimg.com/originals/61/2c/fe/612cfeb5e9560583f753336c565a70bc.gif",
      "https://media1.tenor.com/images/aa76186dc654f6938bd2e75dc0aa2a0b/tenor.gif?itemid=10316502",
      "https://carnivorouslreviews.files.wordpress.com/2018/08/interlocking.gif",
      "https://media1.tenor.com/images/73eaea88d9b2f191bbed563192d7efb1/tenor.gif?itemid=14588244",
      "https://i.pinimg.com/originals/8f/70/71/8f70714a8fc965fdcae4d7d11bc4c683.gif"
     ];
    let { body } = await superagent.get(`https://nekos.life/api/v2/img/kiss`);
    let user =
      message.mentions.users.first() || message.guild.members.get(args[0]);


    const embed = new MessageEmbed()
      .setDescription(
        `**${message.author.tag}** is holding **${user.tag}**'s hands *blush* :blush:`
      )
      .setColor(0xffd1dc)
      .setImage(fuckimg[Math.floor(Math.random() * fuckimg.length)])
    message.channel.send({ embed });
  }
};
