const {MessageEmbed} = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "poke",
    description: "lets you poke someone",
    hasArgs: true,
    args: "who do you want to poke?",
    usage: "<@who>",
    category: "Reactions",
    async execute(client, message,args){
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/poke`);
        let user = message.mentions.users.first() || message.guild.members.get(args[0]); 
        let embed = new MessageEmbed();
        embed.setDescription(`Hmmm...**${message.author.tag}** pokes **${user.tag}**`);
        embed.setColor(0xcfc6cd);
        embed.setImage(body.url);

        message.channel.send(embed);
    }
}
