const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "lick",
  description: "lets you lock someone",
  hasArgs: true,
  args: "who do you want to lick?",
  usage: "<@who>",
  category: "Reactions",
  async execute(client, message, args) {
    
    const lickimg = [
      "https://i.imgur.com/c275Pff.gif",
      "https://i.pinimg.com/originals/73/7b/7c/737b7cb1efb023473c787d5694b6064a.gif",
      "https://pa1.narvii.com/7150/ec41cd480f0424b8f89eb907f608e51a5374b263r1-960-540_hq.gif",
      "https://i.imgur.com/IjSgBcy.gif",
      "https://i.imgur.com/wLV0Z40.gif",
      "https://i.kym-cdn.com/photos/images/original/001/093/355/909.gif"
    ];
    let { body } = await superagent.get(`https://nekos.life/api/v2/img/kiss`);
    let user =
      message.mentions.users.first() || message.guild.members.get(args[0]);

    const embed = new MessageEmbed()
      .setDescription(
        `**${message.author.tag}** licks **${user.tag}** *blush* :blush:`
      )
      .setColor(0xffd1dc)
      .setImage(lickimg[Math.floor(Math.random() * lickimg.length)])
    message.channel.send({ embed });
  }
};
