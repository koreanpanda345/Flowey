const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "gangbang",
  description: "idek why this is added",
  hasArgs: true,
  args: "who do you want to gangbang?",
  usage: "<@who>",
  category: "Reactions",
  async execute(client, message, args) {
    
    const gangimg = [
      "https://media.discordapp.net/attachments/479066060914688001/681421098847698964/ByNz.gif",
      "https://media.discordapp.net/attachments/479066060914688001/681421448077770760/original.gif",
      "https://i.gifer.com/8DJt.gif",
      "https://data.whicdn.com/images/178185255/original.gif",
      "https://gifimage.net/wp-content/uploads/2017/10/hugging-anime-gif-7.gif",
      "https://i.kym-cdn.com/photos/images/newsfeed/000/642/280/8ae.gif",
    ];
    let user =
      message.mentions.users.first() || message.guild.members.get(args[0]);

    const embed = new MessageEmbed()
      .setDescription(
        `**${message.author.tag}** gangbanged **${user.tag}** *blush* :blush:`
      )
      .setColor(0xffd1dc)
      .setImage(gangimg[Math.floor(Math.random() * gangimg.length)])
    message.channel.send({ embed });
  }
};
