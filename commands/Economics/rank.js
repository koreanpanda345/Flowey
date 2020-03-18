const {MessageEmbed} = require('discord.js');
const Airtable = require('airtable');
const AirTable = require('../../Module/Airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');

  module.exports = {
      name: "rank",
      category: "Economics",
      description: "This displays your level rank in the server.",
      async execute(client, message, args){
        base('Users').select({
            sort: [{field: 'level', direction: 'desc'}],
        }).eachPage(function page(records, fetchNextPage){
            let i = 1;
            let rank = 0;
            records.forEach(function(record){
                if(record.get('ID') === `${message.author.id}`){
                    rank = i;
                }
                else i++;
            })
            let embed = new MessageEmbed()
            .setTitle(`Your rank is ${rank}`);

            message.channel.send(embed);
        })
      }
  }