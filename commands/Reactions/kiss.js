const {MessageEmbed} = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "kiss",
    description: "lets you kiss someone",
    hasArgs: true,
    args: "who do you want to kiss?",
    usage: "<@who>",
    category: "Reactions",
    async execute(client, message,args){
      const kissemoji = message.guild.emojis.cache.find(e => e.name === "thalkissing");
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/kiss`);
        let user = message.mentions.users.first() || message.guild.members.get(args[0]);
        let embed = new MessageEmbed();
        embed.setDescription(`**${message.author.tag}** kisses **${user.tag}** *blush* ${kissemoji}`);
        embed.setColor(0xffd1dc);
        embed.setImage(body.url);

        message.channel.send(embed);
    }
}
