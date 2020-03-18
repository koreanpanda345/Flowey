const Discord = require('discord.js');
const Airtable =require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: api
});
var base = Airtable.base("appI2X0jR7jcQvacQ");
module.exports ={
  name: "afk",
  description: "allows you to go afk",
  category: "Miscellaneous",
  async execute(client, message, args){
    let msg = args.join(" ");
    let afkMsg = "";
    if(!msg)
      afkMsg = "AFK";
    else
      afkMsg = msg
    base('AFK').select({
      filterByFormula: `{id} = ${message.author.id}`
    }).eachPage(async function page(records, fetchNextPage){
      if(!records.length){
        base('AFK').create({
          'id': message.author.id,
          'isAfk': true,
          'message': afkMsg,
        }, async function(err, record){
          if(err) return console.error(err);
          message.channel.send(`Set afk status to ${afkMsg}`);
          await ChangeName(message);
          return;
        });
      }
      let _record;
      let _isAfk;
      records.forEach(function(record){
        _record = record.getId();
        _isAfk = record.get('isAfk');
      })
      if(!_isAfk){
        base('AFK').update([{
          'id': _record,
          'fields':{
            'isAfk': true,
            'message': afkMsg
          }
        }], async function(err, record){
          if(err) return console.error(err);
          message.channel.send(`Set your afk status to ${afkMsg}`);
          await ChangeName(message);
          return;
        })
      }
      else{
        return message.channel.send('you are already afk.');
      }
    })
  }
}

async function ChangeName(message){

  let user = message.member;
  let username; 
  if(user.nickname === null) 
    username = message.author.username;
  else
   username = user.nickname;
  user.setNickname(`[♡] ${username}`);
}
