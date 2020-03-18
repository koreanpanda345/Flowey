const prefix = process.env.PREFIX;
const cooldownTime = 3; //in seconds
const { Collection } = require("discord.js");
const Airtable = require("airtable");
const AirTable = require("../../Module/Airtable");
const api = process.env.AIRTABLE;
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: api
});
var base = Airtable.base("appI2X0jR7jcQvacQ");
const Xp = require(`../../Module/Xp.js`);
const AFK = require(`../../Module/AFK.js`);
module.exports = async (client, message) => {
  /*const cute = message.guild.emojis.find(e => e.name === "Thalcute");
      const heart = message.guild.emojis.find(e => e.name === "Thalheart");
  //🛏️ ⛓️
  if(message.author.id === "272592758328262668"){
    message.react('🛏️').then(() => {
      message.react('⛓️');
    })
  }
  if(message.author.id === "497424291181363210"){
    message.react(cute).then(() => {
      message.react(heart);
    })
  }*/
  let disable = false;
  base("Users")
    .select({
      filterByFormula: `{ID} = ${message.author.id}`
    })
    .eachPage(async function page(records, fetchNextPage) {
      records.forEach(async function(record) {
        if (record.get("Disable")) disable = true;
      });
      if (disable) return;
      if (message.author.bot) return;
      if (message.channel.type === "dm") return;
      await AFK(message);
      if (message.channel.id !== "672184729121849418") {
        let xpAdd = 1;
        await Xp(message, xpAdd);
        }
    /*const cute = message.guild.emojis.find(e => e.name === "Thalcute");
      const heart = message.guild.emojis.find(e => e.name === "Thalheart");
    if(message.author.id === "363298519941120000"){
        message.react(cute).then(()=>{
                       message.react(heart);
    })
      }*/
      if (message.content.toLowerCase().startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command =
          client.commands.get(commandName) ||
          client.commands.find(
            cmd => cmd.aliases && cmd.aliases.includes(commandName)
          );
        
        const cooldowns = client.cooldowns;

        if (!command) return;
        if (!cooldowns.has(command.name)) {
          cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldowns || cooldownTime) * 1000;
        if (command.hasArgs && !args.length) {
          return message.channel.send(command.args);
        }
        if (timestamps.has(message.author.id)) {
          const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = expirationTime - now;
            const timeLeftSeconds = Math.floor((timeLeft / 1000) % 60);
            const timeLeftMinutes = Math.floor((timeLeft / (1000 * 60)) % 60);
            const timeLeftHours = Math.floor(
              (timeLeft / (1000 * 60 * 60)) % 60
            );

            if (timeLeftHours >= 1)
              return message.reply(
                `Please wait ${timeLeftHours} hours, ${timeLeftMinutes} minutes, and ${timeLeftSeconds.toFixed(
                  1
                )} more second(s) before reusing the \`${
                  command.name
                }\` command.`
              );
            else if (timeLeftMinutes >= 1)
              return message.reply(
                `Please wait ${timeLeftMinutes} minutes, and ${timeLeftSeconds.toFixed(
                  1
                )} more second(s) before reusing the \`${
                  command.name
                }\` command.`
              );
            else
              return message.reply(
                `Please wait ${timeLeftSeconds.toFixed(
                  1
                )} second(s) before reusing the \`${command.name}\` command.`
              );
          }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
          command.execute(client, message, args);
        } catch (e) {
          console.error(e);
          message.channel.send(
            "There was an error trying to execute the command."
          );
        }
      } else {
        return;
      }
    });
};
