const {MessageEmbed} = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "nom",
    description: "lets you nom someone",
    aliases: ['eat'],
    hasArgs: true,
    args: "who do you want to nom?",
    usage: "<@who>",
    category: "Reactions",
    async execute(client, message,args){
      const nomemoji = message.guild.emojis.cache.find(e => e.name === "thalnom");
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/feed`);
        let user = message.mentions.users.first() || message.guild.members.get(args[0]);
        let embed = new MessageEmbed();
        embed.setDescription(`**${message.author.tag}** noms **${user.tag}** ${nomemoji} ~~umu~~`);
        embed.setColor(0xa1df94);
        embed.setImage(body.url);

        message.channel.send(embed);
    }
}
