const AirTable = require('../../Module/Airtable');
const {MessageEmbed} = require('discord.js');
const Airtable = require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: api
});
var base = Airtable.base('appI2X0jR7jcQvacQ');
module.exports = {
    name: "airtable",
    description: "creates a test record to send to airtable.",
    category: 'Dev',
    async execute(client, message, args){
        base('Users').select({
            maxRecords: 1,
            view: "Grid view"
          }).eachPage(function page(records, fetchNextPage){
            records.forEach(function(record){
              if(record.get('ID') === "304446682081525772");
              let air = record;
              console.log(record);
              let embed = new MessageEmbed();
              console.log(air.get('ID'));
              console.log(air.get('description'));
              embed.setAuthor(`<@${air.get('ID')}>`);
              embed.setDescription(`${air.get('description')}`);
              message.channel.send(embed);
            });
          });
    }
}
