const db = require('quick.db');
const {MessageEmbed} =require('discord.js');
const Airtable = require('airtable');
const AirTable = require('../../Module/Airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
module.exports = {
    name: "shop",
    description: "List of items you can buy from or get info about an item.",
    usage: "(item id)",
    category: "Economics",
    execute(client, message, args){
        const flower = message.guild.emojis.cache.find(e => e.name === "flower2");
        base('Shop').select({
            maxRecords: 25,
            sort:[{"field": "id", "direction": "asc"}],
        }).eachPage(function page(records, fetchNextPage){
            let embed = new MessageEmbed();
            embed.setTitle('Shop');
            records.forEach(function(record){
                embed.addField(`${record.get('id')} | ${record.get('Name')} | Price: ${record.get('Price')} ${flower}`, `${record.get('Description')}`);
            })
             message.channel.send(embed);
        })
    }
}
