const {MessageEmbed} = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "cuddle",
    description: "lets you cuddle with another person",
    hasArgs: true,
    args: "who do you want to cuddle with?",
    usage: "<@who>",
    category: "Reactions",
    async execute(client, message,args){
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/cuddle`);
        let user = message.mentions.users.first() || message.guild.members.get(args[0]);
        let embed = new MessageEmbed();
        embed.setDescription(`Aweee, **${message.author.tag}** cuddles **${user.tag}**~`);
        embed.setColor(0xa1dbff);
        embed.setImage(body.url);

        message.channel.send(embed);
    }
}




