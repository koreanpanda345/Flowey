const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'allows you to mute a user.',
    category: "Moderation",
    hasArgs: true,
    args: "Who do you want to mute? owo",
    async execute(client, message, args){
        if(!message.member.hasPermission("MANAGE_ROLES") && !message.guild.owner) return message.channel.send("You don't have permission to use this command");
        
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles.");

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        let reason = args.slice(1).join(" ");

        if(!reason) reason = "No reason given";

        let muteRole = message.guild.roles.find(r => r.name === "Muted")
        if(!muteRole){
            try {
                muteRole = await message.guild.createRole({
                    name: "Muted",
                    color: "#ffd1dc",
                    permission: [],
                })
                message.guild.channels.forEach(async(channel, id) => {
                    await channel.overwritePermission({
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }
        mutee.addRole(muteRole.id).then(() => {
            message.delete();
            mutee.send(`Hello you have been muted in ${message.guild.name} for: ${reason}`);
            message.channel.send(`${mutee.user.username} was successfully muted.`);
        })

        let embed = new Discord.MessageEmbed();
        embed.setColor(0xffb6c1);
        embed.setTitle('~Mute~');
        embed.addField(`Mutee`, mutee.user.username);
        embed.addField(`Moderator`, message.author.username);
        embed.addField(`Reason`, reason);
        embed.addField(`Date`, message.createdAt);

        message.channel.send(embed);
    }
}