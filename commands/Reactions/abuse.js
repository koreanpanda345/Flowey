const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "abuse",
  aliases: ["abose", "abusepanda"],
  description: "Allows you to abuse someone (PLEASE ABOSE PANDA, HE LIKES IT HARD~)",
  hasArgs: true,
  args: "umu",
  usage: "<@who>",
  category: "Reactions",
  async execute(client, message, args) {
    const blush = message.guild.emojis.cache.find(e => e.name === "Pandablush");
    const abuseimg = [
      "https://thumbs.gfycat.com/EllipticalLargeKitfox-size_restricted.gif",
      "https://data.whicdn.com/images/301885728/original.gif",
      "https://ci.memecdn.com/4158473.gif",
      "https://media1.tenor.com/images/c4f16143fd2df930ad3e64a3f902d486/tenor.gif?itemid=12388326",
      "https://media.giphy.com/media/t2rkjXOxuptra/giphy.gif"
    ];
    let { body } = await superagent.get(`https://nekos.life/api/v2/img/kiss`);
    let user =
      message.mentions.users.first() || message.guild.members.get(args[0]);

    const embed = new MessageEmbed()
      .setDescription(
        `**${message.author.tag}** is abusing **${user.tag}**' h-harder~ ${blush}`
      )
      .setColor(0xffd1dc)
      .setImage(abuseimg[Math.floor(Math.random() * abuseimg.length)])
    message.channel.send({ embed });
  }
};
