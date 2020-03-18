const Airtable = require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
  //@ts-check
  module.exports = {
  name: "divorce",
  description: "Allows you to divorce your waifu.",
  category: "Economics",
  execute(client, message, args){
    base('Users').select({
      filterByFormula: `{ID} = ${message.author.id}`,
    }).eachPage(function page(records, fetchNextPage){
      let user;
      let _record;
      records.forEach(function(record){
        user = record.get('marry');
        _record = record.getId();
      })
      if(user === "No one") return message.channel.send('You are not married to anyone.');
      base('Users').select({
        filterByFormula: `{ID} = ${user}`,
      }).eachPage(function page(records, fetchNextPage){
        let _user;
        records.forEach(function(record){
          _user = record.getId();
        })
        base('Users').update([{
          "id": _record,
          "fields": {
            "marry": "No one"
          },
        }, {
          "id": _user,
          "fields": {
            "marry": "No one",
          },
        }], function(err, record){
          if(err) return console.error(err);
          let name = client.users.find(m => m.id === user);
          message.channel.send(`You divorced ${name.username}`);
        })
      })
    })
  }
}
