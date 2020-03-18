const {MessageEmbed} = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "pat",
    description: "lets you pat someone",
    hasArgs: true,
    args: "who do you want to pat?",
    usage: "<@who>",
    category: "Reactions",
    async execute(client, message,args){
       const patemoji = message.guild.emojis.cache.find(e => e.name === "thalpat");
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/pat`);
        let user = message.mentions.users.first() || message.guild.members.get(args[0]);
        let embed = new MessageEmbed();
        embed.setDescription(`**${message.author.tag}** pats **${user.tag}** ${patemoji} *aweeee*`);
        embed.setColor(0xfdf0e4);
        embed.setImage(body.url);

        message.channel.send(embed);
    }
}
