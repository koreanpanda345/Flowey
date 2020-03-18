const db = require('quick.db');
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
    name: "bless",
    description: "Summons Mika Flower Fairies to bless your garden!",
    category: "Economics",
    cooldowns: 1,
    execute(client, message, args){
        if(db.has(`${message.author.id}.bless`)){
            if(Date.now() <=db.get(`${message.author.id}.bless`)){
                    const timeLeft = (db.get(`${message.author.id}.bless`) - Date.now());
                    const timeLeftSeconds = (Math.floor((timeLeft/1000)%60));
                    const timeLeftMinutes = (Math.floor((timeLeft/(1000*60))%60));
                    const timeLeftHours = (Math.floor((timeLeft/(1000*60*60))%60));
                    if (timeLeftHours >= 1)
                    return message.reply(`Please wait ${timeLeftHours} hours, ${timeLeftMinutes} minutes, and ${timeLeftSeconds.toFixed(1)} more second(s) before reusing the \`bless\` command.`);
                else if (timeLeftMinutes >= 1)
                    return message.reply(`Please wait ${timeLeftMinutes} minutes, and ${timeLeftSeconds.toFixed(1)} more second(s) before reusing the \`bless\` command.`);
                else 
                    return message.reply(`Please wait ${timeLeftSeconds.toFixed(1)} second(s) before reusing the \`bless\` command.`);
            }
        } 
        let payment = Math.floor((Math.random() +0.01) * 300);
        const flower = message.guild.emojis.cache.find(e => e.name === "flower2");
       const mikasip = message.guild.emojis.cache.find(e => e.name === "TGMika_Sip");
       const mika1 = message.guild.emojis.cache.find(e => e.name === "TGMika1");
       const mika2 = message.guild.emojis.cache.find(e => e.name === "TGMika2");
       const mika3 = message.guild.emojis.cache.find(e => e.name === "TGMika3");
       const mika4 = message.guild.emojis.cache.find(e => e.name === "TGMika4");
       base(`Users`).select({
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
                    let embed = new MessageEmbed();
                    embed.setColor(0xb8eff2);
                    embed.setTitle(`You got Mika'd ${mikasip}`);
                    embed.setDescription(`Some Mika Flower Fairies started dancing around your garden and you were blessed with ${payment} ${flower}!\n${mika1}${mika2}${mika3}${mika4} `);
            
                    message.channel.send(embed);
                    db.set(`${message.author.id}.bless`, Date.now() + (600 * 1000));
                })
            })
        })
       })
    }
}
