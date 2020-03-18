const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../../music/handleVideo');

module.exports = {
    name: "volume",
    aliases: ['vol'],
    description: "Displays the current volume or changes it",
      category: "Music",
    execute(bot, message, args){
        let prefix = process.env.PREFIX;
        const serverQueue = queue.get(message.guild.id);
        if(!message.member.voice.channel) return message.channel.send('You are not in a voice channel');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        let volEmbed = new Discord.MessageEmbed()
        .setTitle(`Volume`)
        .setColor(0xc6e2ff)
        .setAuthor(message.author.username)
        .addField('Current Volume', ` **${serverQueue.volume}**`)
        .addField('To Change The Volume', `*${prefix}vol [1-100]* or *${prefix}volume [1-100]*`)
        .addField('Example:', `*${prefix}vol 60* or *${prefix}volume 60*`);
      
        if(!args[0])return message.channel.send(volEmbed);
        if(args[0] < 20 || args[0] > 100) return;
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
        return message.channel.send(`I set the volume to: **${args[0]}**`);
    }
}