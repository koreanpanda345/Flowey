const { MessageEmbed } = require("discord.js");
const Airtable = require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
//@ts-check
  module.exports = {
  name: "leaderboard",
  aliases: ["board", "leader", "lb"],
  description:
    "displays the leaderboard for flowers owned, votes received or levels gained.", //Description appended by Amrit.
  category: "Economics",
  hasArgs: true,
  args: "Do you want flower, level, or vote",
  usage: ".lb <flower/level/vote>",
  execute(client, message, args) {
    if (args[0] === "flower"){
      let desc = " ";
      let i = 1;
      base('Users').select({
        maxRecords: 10,
        sort: [{field: "balance", direction: "desc"}]
      }).eachPage(function page(records, fetchNextPage){
        records.forEach(function(record){
          let user = client.users.cache.find(m => m.id === record.get('ID'));
          desc += `${i++} - ${user !== null ? user.tag : "Unknown#0000"} - ${record.get('balance')}\n`;

        })
        let embed = new MessageEmbed()
        .setTitle(`~Flower Leaderboard~`)
        .setColor(0xffb6c1)
        .setDescription(desc);
        message.channel.send(embed);
      })

    }
    else if(args[0] === "level"){
      let desc = " ";
      let i = 1;
      base('Users').select({
        maxRecords: 10,
        sort: [{field: "level", direction: "desc"}]
      }).eachPage(function page(records, fetchNextPage){
        records.forEach(function(record){
          let user = client.users.cache.find(m => m.id === record.get('ID'));
          desc += `${i++} - ${user !== null ? user.tag : "Unknown#0000"} - ${record.get('level')}\n`;

        })
        let embed = new MessageEmbed()
        .setTitle(`~Level Leaderboard~`)
        .setColor(0xffb6c1)
        .setDescription(desc);
        message.channel.send(embed);
      })
    }
    else if(args[0] === "vote"){
      let desc = " ";
      let i = 1;
      base('Users').select({
        maxRecords: 10,
        sort: [{field: "votes", direction: "desc"}]
      }).eachPage(function page(records, fetchNextPage){
        records.forEach(function(record){
          let user = client.users.cache.find(m => m.id === record.get('ID'));
          desc += `${i++} - ${user !== null ? user.tag : "Unknown#0000"} - ${record.get('votes')}\n`;

        })
        let embed = new MessageEmbed()
        .setTitle(`~Votes Leaderboard~`)
        .setColor(0xffb6c1)
        .setDescription(desc);
        message.channel.send(embed);
      })
    }
    else return;
  }
};
