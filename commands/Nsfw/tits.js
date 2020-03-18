//nsfw_neko_gif
const {MessageEmbed} = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: "tits",
    description: "tits",
    category: "Nsfw",
    async execute(client, message,args){
      if(message.channel.nsfw){
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/tits`);
        let embed = new MessageEmbed();
        embed.setColor(0xffb6c1);
        embed.setImage(body.url);
        message.channel.send(embed);
      }
    }
}
