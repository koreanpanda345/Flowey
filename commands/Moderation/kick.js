const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  hasArgs: true,
  args: "Who do you want to kick?",
  description: "Kicks a member from the server.",
  category: "Moderation",
  usage: "<@who> (reason)",
  execute(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        "Sorry but you do not have permission to do this."
      );
    let user = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!user) return message.channel.send("Can't find user!");
    let reason = args.join(" ").slice(22) || "No reason was given";
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        "I don't have the right permission to do this. I need the permission of `Kick Members`"
      );

    let embed = new MessageEmbed()
      .setDescription("~Kick~")
      .setColor(0xf20e0e)
      .addField("Kicked User", user)
      .addField("Kicked By", message.author.tag)
      .addField("Kicked In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", reason);

    user.kick(reason);
    message.channel.send(embed);
    return;
  }
};
