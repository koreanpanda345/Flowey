const db = require('quick.db');
const Airtable = require('airtable');
const AirTable = require('../../Module/Airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
  //@ts-check
module.exports = {
  name: "vote",
  hasArgs: true,
  description: "Allows you to vote for someone, and get some currency from it.",
  args: "Who do you want to vote for?",
  usage: "<@who>",
  category: "Economics", 
  cooldowns: 1,//12 hours
  execute(client, message, args){
    if(db.has(`${message.author.id}.vote`)){
      if(Date.now() <=db.get(`${message.author.id}.vote`)){
              const timeLeft = (db.get(`${message.author.id}.vote`) - Date.now());
              const timeLeftSeconds = (Math.floor((timeLeft/1000)%60));
              const timeLeftMinutes = (Math.floor((timeLeft/(1000*60))%60));
              const timeLeftHours = (Math.floor((timeLeft/(1000*60*60))%60));
              if (timeLeftHours >= 1)
              return message.reply(`Please wait ${timeLeftHours} hours, ${timeLeftMinutes} minutes, and ${timeLeftSeconds.toFixed(1)} more second(s) before reusing the \`vote\` command.`);
          else if (timeLeftMinutes >= 1)
              return message.reply(`Please wait ${timeLeftMinutes} minutes, and ${timeLeftSeconds.toFixed(1)} more second(s) before reusing the \`vote\` command.`);
          else 
              return message.reply(`Please wait ${timeLeftSeconds.toFixed(1)} second(s) before reusing the \`vote\` command.`);
      }
  } 
    let money = 150;
    const flower = message.guild.emojis.cache.find(e => e.name === "flower2");
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(user.id === message.author.id) return message.channel.send("Find someone to vote for you ;-; you can't vote for yourself, but here's a hug. *hugs*");
    base('Users').select({
      filterByFormula: `{ID} = ${message.author.id}`
    }).eachPage(function page(records, fetchNextPage){
      let _voter;
      let _bal;
      records.forEach(function(record){
        _voter = record.getId();
        _bal = record.get('balance');
      })
      base('Users').select({
        filterByFormula: `{ID} = ${user.id}`
      }).eachPage(function page(records, fetchNextPage){
        let _votee;
        let _votes;
        let _weekly;
        records.forEach(function(record){
          _votee = record.getId();
          _votes = record.get('votes');
          _weekly = record.get('weekly');
        })
        base('Users').update([{
          'id': _voter,
          'fields':{
            "balance": _bal + money,
          },
        },
        {
          'id': _votee,
          "fields":{
            "votes": _votes + 1,
            "weekly": _weekly + 1,
          },
        }], function(err, record){
          if(err) console.error();
        })
      })
    })
       db.set(`${message.author.id}.vote`, Date.now() + (43200 * 1000));
   return message.channel.send(`You voted for **${user.displayName}** and got ${money} ${flower} flowers in return!`);
  }
  }
// return message.channel.send(`You voted for **${user.displayName}** and got ${money} ${flower} flowers in return!`);
