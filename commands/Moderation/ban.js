const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  hasArgs: true,
  args: "Who do you want to ban? __ex:__ .ban **Thal#0068**",
  description: "Bans a member from the server.",
  category: "Moderation",
  usage: "<@who> (reason)",
  execute(client, message, args) {
    let user =
      message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      message.channel.send("Sorry but you do not have permission to do this.");
    } else if (!user) {
      message.channel.send("Can't find user!");
    } else if (message.member.id == user.id) {
      message.channel.send("You can't ban yourself!!");
    } else {
      let reason = args.join(" ").slice(22) || "No reasons were given";
      if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
        message.channel.send(
          "I don't have the right permission to do this. I need the permission of `Ban Members`"
        );
      } else {
        let embed = new MessageEmbed()
          .setDescription("~Ban~")
          .setColor(0xf20e0e)
          .addField("Banned User", user)
          .addField("Banned By", message.author.tag)
          .addField("Banned In", message.channel)
          .addField("Time", message.createdAt)
          .addField("Reason", reason);

        message.guild.members.ban(user.id)
        .catch(error => console.error(error));
        message.channel.send(embed);
      }
      return;
    }
  }
};
