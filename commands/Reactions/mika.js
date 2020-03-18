const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "mika",
  description: "A command exclusively for <@469083753361309696>",
  hasArgs: true,
  args: "uwu mikaaaa",
  usage: "<@who>",
  category: "Reactions",
  async execute(client, message, args) { 
    var allowedList = ['304446682081525772','469083753361309696','366118773507227648','579260462995079169', '321479019134713857']
    if(allowedList.includes(message.author.id)){
      const mika3 = message.guild.emojis.cache.find(e => e.name === "TGMika3");
      let { body } = await superagent.get(
        `https://nekos.life/api/v2/img/cuddle`
      );
      let user =
        message.mentions.users.first() || message.guild.members.get(args[0]);
      let embed = new MessageEmbed();
      embed.setTitle(
        `**${message.author.tag}** mika'd **${user.tag}**~ ${mika3}`
      );
      embed.setDescription(
        `hi qt umu~`
      );
      embed.setColor(0xa1dbff);
      embed.setImage(body.url);
      message.channel.send(embed);
    }else{
      message.channel.send(`You do not have permission to use mika uwu`);
    }
  }
};
