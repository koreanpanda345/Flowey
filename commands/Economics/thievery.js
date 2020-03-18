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
    name: "thievery",
    aliases: ["steal", "thieve", "rob"],
    description: "Allows you to work to get money",
    category: "Economics",
    cooldowns: 30,
    execute(client, message, args){

        let payment = Math.floor(Math.random() * 100);
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
                           "went sightseeing and you saw some beautiful flowers so you stole them.",
                           "pretended to work at the flower shop to steal some flowers.",
                           "blackmailed panda into giving up his precious flowers.",
                           "worked as a wedding planner but the flowers were so beautiful you ran off with them.",
                           "were supposed to plant flowers but you plucked them all and fled the scene.",
                           "lured some lolis into your trap and forced them to steal flowers for you",
                         ];
                     
                         let embed = new MessageEmbed();
                        embed.setColor(0xffb6c1);
                        embed.setTitle(`You ${jobs[Math.floor(Math.random() * (jobs.length - 1))]}`);
                        embed.setDescription(`Yay... you got ${payment} ${flower} flowers but the police caught you :v`);
               
                        message.channel.send(embed);
                
                    })
                })
            })
            
        })
    }

}
