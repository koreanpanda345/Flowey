//@ts-check
const {MessageEmbed} = require('discord.js');
const Airtable = require('airtable');
const AirTable = require('../../Module/Airtable');
const api = process.env.AIRTABLE;
//@ts-ignore
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  //@ts-ignore
  var base = Airtable.base('appI2X0jR7jcQvacQ');
module.exports = {
    name: "balance",
    aliases: ["bal"],
    description: "Displays your current balances",
    category: "Economics",
    cooldowns: 7,
    execute(client, message, args){
        base('Users').select({
            filterByFormula: `{ID} = ${message.author.id}`,
        }).eachPage(function page(records, fetchNextPage){
            records.forEach(function(record){
                const flower = message.guild.emojis.cache.find(e => e.name === "flower2");
                //@ts-ignore
                let embed = new MessageEmbed();
                embed.setColor(0xffd1dc);
                embed.setTitle(`${message.author.username}'s Flower Garden`);
                embed.setDescription(`You currently have ${record.get('balance')}  ${flower} flowers in your garden!`);
        
                message.channel.send(embed);
            })
        })
        /*if(!db.has(`flower_${message.author.id}`)){
            db.set(`flower_${message.author.id}`, {balance: 0});
        }
      const flower = message.guild.emojis.find(e => e.name === "flower2");
        let embed = new RichEmbed();
        embed.setColor(0xffd1dc);
        embed.setTitle(`${message.author.username}'s Flower Garden`);
        embed.setDescription(`You currently have ${db.get(`flower_${message.author.id}.balance`)}  ${flower} flowers in your garden!`);

        message.channel.send(embed);
        */
    } 
}
