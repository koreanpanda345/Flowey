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
    name: "daily",
    alias: ["d"],
    description: "Gives you money once a day",
    category: "Economics",
    execute(client, message, args){
        if(db.has(`${message.author.id}.daily`)){
            if(Date.now() <=db.get(`${message.author.id}.daily`)){
                    const timeLeft = (db.get(`${message.author.id}.daily`) - Date.now());
                    const timeLeftSeconds = (Math.floor((timeLeft/1000)%60));
                    const timeLeftMinutes = (Math.floor((timeLeft/(1000*60))%60));
                    const timeLeftHours = (Math.floor((timeLeft/(1000*60*60))%60));
                    if (timeLeftHours >= 1)
                    return message.reply(`Please wait ${timeLeftHours} hours, ${timeLeftMinutes} minutes, and ${timeLeftSeconds.toFixed(1)} more second(s) before reusing the \`daily\` command.`);
                else if (timeLeftMinutes >= 1)
                    return message.reply(`Please wait ${timeLeftMinutes} minutes, and ${timeLeftSeconds.toFixed(1)} more second(s) before reusing the \`daily\` command.`);
                else 
                    return message.reply(`Please wait ${timeLeftSeconds.toFixed(1)} second(s) before reusing the \`daily\` command.`);
            }
        } 
        let payment = 500;
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
                    const flower = message.guild.emojis.cache.find(e => e.name === "flower2");

                    let embed = new MessageEmbed();
                    embed.setColor(0xffb6c1);
                    embed.setTitle(`${message.author.username}'s Daily Reward!!!`);
                    embed.setDescription(`${message.author.username} got ${payment} ${flower} flowers as their daily reward!`);  
                    message.channel.send(embed);
                    db.set(`${message.author.id}.daily`, Date.now() + (86400 * 1000));
                 })
             })
         })
        })
    }
}
