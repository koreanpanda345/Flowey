const { MessageEmbed } = require("discord.js");
const request = require("request");

module.exports = {
  name: "tickle",
  description: "lets you tickle someone",
  hasArgs: true,
  args: "who do you want to tickle?",
  usage: "<@who>",
  category: "Reactions",
  execute(client, message, args) {
    let user =
      message.mentions.users.first() || message.guild.members.get(args[0]);
    let target = message.mentions.members.first(),
      url = "https://cdn.ram.moe",
      req = "https://rra.ram.moe/i/r?type=";
    var text;

    request({ url: `${req}tickle`, json: true }, (err, res, body) => {
      if (err) return console.log(err);

      let path = body.path.replace(/\/i/gi, ""),
        type = body.path.split(".")[1];
      let embed = new MessageEmbed();
      embed.setDescription(
        `Oh my..**${message.author.tag}** is tickling **${user.tag}** *~~moans~~*`
      ); //Please change text.
      embed.setColor(0xb599de); //Change colour too please. done
      embed.setImage(`${url}${path}`);
      message.channel.send(embed);
    });
  }
};
