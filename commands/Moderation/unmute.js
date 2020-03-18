const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unmute",
  hasArgs: true,
  args: "Who do you want to unmute?",
  description: "unmutes a member in the discord!",
  usage: "<@who> (reason)",
  category: "Moderation",
  aliases: ["unm"],
  async execute(client, message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
      return message.channel.send(
        "You don't have permission to use this command"
      );

    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
      return message.channel.send("I don't have permission to add roles.");

    let mutee =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    let reason = args.slice(1).join(" ");

    if (!reason) reason = "No reason given";

    let muterole = message.guild.roles.find(r => r.name === "Muted");
    if (!muterole)
      return message.channel.send("There is no mute role to remove!");

    mutee.removeRole(muterole.id).then(() => {
      message.delete();
      mutee.send(
        `Hello you have been unmuted in ${message.guild.name} for: ${reason}`
      );
      message.channel.send(`${mutee.user.username} was successfully unmuted.`);
    });

    let embed = new MessageEmbed();
    embed.setColor(0xffb6c1);
    embed.setTitle("~Unmute~");
    embed.addField(`Mutee`, mutee.user.username);
    embed.addField(`Moderator`, message.author.username);
    embed.addField(`Reason`, reason);
    embed.addField(`Date`, message.createdAt);

    message.channel.send(embed);
  }
};
