const {MessageEmbed} = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "hug",
    description: "lets you hug someone",
    hasArgs: true,
    args: "who do you want to hug?",
    usage: "<@who>",
    category: "Reactions",
    async execute(client, message,args){
      const hugemoji = message.guild.emojis.cache.find(e => e.name === "hug");
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/hug`);
        let user = message.mentions.users.first() || message.guild.members.get(args[0]);
        let embed = new MessageEmbed();
        embed.setDescription(`OwO **${message.author.tag}** kills **${user.tag}** with a hug ${hugemoji}~`);
        embed.setColor(0xffb6c1);
        embed.setImage(body.url);

        message.channel.send(embed);
    }
}
