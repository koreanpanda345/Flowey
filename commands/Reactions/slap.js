const {MessageEmbed} = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "slap",
    description: "lets you slap someone", 
    hasArgs: true,
    args: "who do you want to slap?",
    usage: "<@who>",
    category: "Reactions",
    async execute(client, message,args){
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/slap`);
        let user = message.mentions.users.first() || message.guild.members.get(args[0]);
      if(message.author.id == '294831448567840778'){
        let embed = new MessageEmbed();
        embed.setDescription(`**$Talha has asked to be slapped!! *~~ouchie~~*`);
        embed.setColor(0xe87698);
        embed.setImage(body.url);

        message.channel.send(embed);
      }else{
        let embed = new MessageEmbed();
        embed.setDescription(`**${message.author.tag}** slaps **${user.tag}** hard.. *~~ouchie~~*`);
        embed.setColor(0xe87698);
        embed.setImage(body.url);

        message.channel.send(embed);
      }
    }
}
