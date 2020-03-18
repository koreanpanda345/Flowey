process.on("unhandledRejection", error =>
  console.error("Uncaught Promise Rejection", error)
);
const { Client, Collection } = require("discord.js");
const client = new Client({ disableEveryone: true });
const token = process.env.DISCORD_TOKEN;
//This is the collection of commands and cooldowns.
["commands", "cooldowns"].forEach(x => (client[x] = new Collection()));
//this is going to run all of the events and commands when told to execute
["command", "event"].forEach(x => require(`./handler/${x}`)(client));


client.login(token);
