const {MessageEmbed} = require("discord.js");
const Airtable = require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
  //@ts-check
  module.exports = {
    name: 'weekly',
    aliases: ["week"],
    description: "Displays the leaderboard for weekly votes.",
    category: "Economics",
    execute(client, message, args){
        let desc = " ";
        let i = 1;
        base('Users').select({
          maxRecords: 10,
          sort: [{field: "weekly", direction: "desc"}]
        }).eachPage(function page(records, fetchNextPage){
          records.forEach(function(record){
            let user = client.users.cache.find(m => m.id === record.get('ID'));
            desc += `${i++} - ${user.tag} - ${record.get('weekly')}\n`;
  
          })
          const embed = new MessageEmbed()
          .setTitle(`**Weekly Votes Leaderboard**`)
          .setDescription(`${desc}`)
          .setColor(0xffb6c1);
          message.channel.send(embed);
        })

    }
}
