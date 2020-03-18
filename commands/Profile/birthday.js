const db = require('quick.db');
const Airtable = require('airtable');
const AirTable = require('../../Module/Airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
module.exports = {
    name: 'birthday',
    aliases: ['bday'],
    description: "Allows you to set your birthday for your profile.",
    hasArgs: true,
    args: "What is your birthday? **ex:** .birthday January 1 2001",
      category: "Profile",
    execute(client, message, args){
      let date = args.join(' ').slice(0);
      base(`Users`).select({
        filterByFormula: `{ID} = ${message.author.id}`,
      }).eachPage(function page(records, fetchNextPage){
      records.forEach(function(record){
        let _record = record.getId();
        base('Users').update([{
          "id": _record,
          "fields":{
            "birthday": date,
          }
        }], function(err, record){
          if(err){
            console.error(err);
            return message.channel.send(`Please enter a valid birthdate.`);
          }
          message.channel.send(`Your birthday is now ${date}`);
        })
      })
      })

        

    }
}
