const { MessageAttachment } = require("discord.js");
const canvas = require("../../Canvas/Welcome.js");

module.exports = async (client, member) => {
  const channel = member.guild.channels.cache.find(ch => ch.name === "💐join");
  if (!channel) return;
  let buffer = await canvas(member, channel);
  const filename = `welcome.png`;
  const attachment = new MessageAttachment(buffer, filename);
  await channel.send(
    `${member} Welcome to **Thal's Garden** , make sure to read <#671225272057593856> and check out <#671222000420782090> to get color roles and introduce yourself to everyone else in <#671074875124875276> !!`,
    attachment
  );
};
