module.exports = {
  name: "latency",
  aliases: ["ping"],
  description: "Displays the Bot's latency",
  category: "Miscellaneous",
  execute(client, message, args) {
   message.channel.send("Pong!").then(m =>
    m.edit(
      `Pong! Response took ${m.createdTimestamp -
        message.createdTimestamp} ms! Heartbeat is ${client.ws.ping.toFixed(
        0
      )} ms!`
    )
  );
  }
};
