const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../../music/handleVideo');

module.exports = {
    name: "remove",
    aliases: ['r'],
    hasArgs: true,
    args: "Please enter the queue number of the song.",
    description: "removes a song from the queue.",
    category: "Music",
    execute(bot, message, args){
        const serverQueue = queue.get(message.guild.id);
            let index = 0;
            let toSkip = args[0];
            toSkip = Math.min(toSkip, serverQueue.songs.length);

            // Skip.
            serverQueue.songs.splice(serverQueue.songs.indexOf(toSkip - 1), 1);
            message.channel.send(`Successfully removed song number ${toSkip} from the queueing list.`);
            let removeEmbed = new Discord.MessageEmbed()
            .setTitle(`Playing ${serverQueue.songs[0].title}`)
            .addField(`**Queuing**:`, serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n'));
            message.channel.send(removeEmbed);
    }
}