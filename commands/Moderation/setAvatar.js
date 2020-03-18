module.exports = {
  name: "setAvatar",
  aliases: ["sa"],
  description: "allows you to change the Bot's avatar.",
  category: "Moderation",
  hasArgs: true,
  args: "The link of the avatar you wish to set",
  async execute(client, message, args) {
    if (!args[0]) return message.channel.send("Please provide an avatar URL");
    if (!message.member.hasPermission("ADMINISTRATOR") && !message.guild.owner)
      return message.channel.send(
        "You don't have permission to use this command"
      );

    client.user.setAvatar(args[0]);
    message.channel.send("Avatar successfully changed.");
  }
};
