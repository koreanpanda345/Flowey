const Discord = require('discord.js');
const Airtable =require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: api
});
var base = Airtable.base("appI2X0jR7jcQvacQ");


module.exports = async (message) => {
  let author = message.author.id;
  let user = message.mentions.users.first();
    base('AFK').select({
        filterByFormula: `{id} = ${author}`
    }).eachPage(function page(records, fetchNextPage){
        if(!records.length) return;
        let _isAfk;
        let _record;
        records.forEach(function(record){
            _isAfk = record.get('isAfk');
            _record = record.getId();
        })

        if(_isAfk){
            base('AFK').update([{
                'id': _record,
                'fields': {
                    'isAfk': false,
                    'message': '',
                }
            }], function(err, records){
                if(err) console.error(err);
            })
            ChangeName(author, message);
        }
        if(!_isAfk) return;
    })
  if(!user) return;
    base('AFK').select({
      filterByFormula: `{id} = ${user.id}`
    }).eachPage(function page(records, fetchNextPage){
      if(!records.length)return;
      let _isAfk;
      let _message;
      records.forEach(function(record){
        _isAfk = record.get('isAfk');
        _message = record.get('message');
      })
      if(!_isAfk) return;
      message.channel.send(`${user.tag} is AFK: ${_message}`);
      return;
    })
}

async function ChangeName(user, message){
    let _user = user;
  let username = message.member.nickname || user.username;
    message.member.setNickname(`${username.replace('[♡]', '')}`);
    message.channel.send(`I have removed your AFK status.`);
  }
