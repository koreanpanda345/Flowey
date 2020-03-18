const db = require('quick.db');
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
    name: "work",
    aliases: ["w"],
    description: "Allows you to work to get money",
    category: "Economics",
    cooldowns: 10,
    execute(client, message, args){

        let payment = Math.floor(Math.random() * 35);
        console.log(payment);
        base('Users').select({
            filterByFormula: `{ID} = ${message.author.id}`,
        }).eachPage(function page(records, fetchNextPage){
            records.forEach(function(record){
                let _record = record.getId();
                let _bal = record.get('balance');
                base('Users').update([{
                    "id": _record,
                    "fields":{
                        "balance": _bal + payment 
                    }
                }], function(err, records){
                    if(err) return console.error(err);
                    records.forEach(function(record){
                        const flower = message.guild.emojis.cache.find(e => e.name === "flower2");
                        let jobs = [
                            "an Environmental Scientist",
                            "a Bioprocessing Engineer",
                            "an Arborist",
                            "a Forest Scientist",
                            "a Forestry Consultant",
                            "a Forestry Technician",
                            "a Horticultural Scientist",
                            "an Irrigation Engineer",
                            "a Plant Geneticist",
                            "a Soil Scientist"
                            ];
                        let embed = new MessageEmbed();
                        embed.setColor(0xffb6c1);
                        embed.setTitle(`You worked as ${jobs[Math.floor(Math.random() * (jobs.length - 1))]}`);
                        embed.setDescription(`You got ${payment} ${flower} flowers!`);
                
                        message.channel.send(embed);
                
                    })
                })
            })
            
        })
    }

}
