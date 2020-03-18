module.exports = {
  name: "join",
  category: "Moderation",
  execute(client, message, args) {
    if (!(message.author.id === "366118773507227648" && message.author.id === "304446682081525772")) return;
    client.emit(`guildMemberAdd`, message.member);
  }
};
