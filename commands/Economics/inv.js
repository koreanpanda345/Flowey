const {MessageEmbed} = require('discord.js');
const Airtable = require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
//@ts-check
  module.exports = {
    name: 'inventory',
    aliases: ['inv'],
    description: "displays all the items you have.",
    category: "Economics",
    execute(client, message, args){
        base('inventory').select({
            filterByFormula: `{user} = ${message.author.id}`,
        }).eachPage(function page(records, fetchNextPage){
            let str;
            records.forEach(function(record){
                str = record.get('item');
            })
            let bamboo = (str.match(/Bamboo/g) || []).length;
            let useless = (str.match(/Useless-chan/g) || []).length;
            let phone = (str.match(/Phone/g) || []).length;
            let Nitro = (str.match(/Nitro/g) || []).length;
            let playlist = (str.match(/Custom Playlist/g) || []).length;
            let embed = new MessageEmbed();
            embed.setTitle(`Inventory`);
            embed.setDescription(`
            ${bamboo !== 0? `Bamboo x${bamboo}\n`: ""}
            ${useless !== 0? `Useless-Chan x${useless}\n`: ""}
            ${phone !== 0? `Phone x${phone}\n` : ""}
            ${Nitro !== 0? `Nitro x${Nitro}` : ""}
            ${playlist !== 0 ? `Custom Playlist x ${playlist}\n` : ""}
            `);

            message.channel.send(embed);
        })
    }
}
