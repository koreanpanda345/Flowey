const db = require('quick.db');
const Airtable = require('airtable');
const AirTable = require('../../Module/Airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
module.exports ={
    name: "setDesc",
    aliases: ["desc"],
    description: "allows you to change your description",
    hasArgs: true,
    args: "What do you want your description to be? **ex:** .desc I'm just a random bored lad",
    category: "Profile",
    execute(client, message, args){
        let desc = args.join(" ").slice(0);
        if(desc.length > 150) return message.channel.send('Sorry you can only have a max of 150 characters')
        base(`Users`).select({
            filterByFormula: `{ID} = ${message.author.id}`,
          }).eachPage(function page(records, fetchNextPage){
          records.forEach(function(record){
            let _record = record.getId();
            base('Users').update([{
              "id": _record,
              "fields":{
                "description": desc,
              }
            }], function(err, record){
              if(err){
                return console.error(err);
              }
              message.channel.send(`Your description is now set to \`${desc}\``);
            })
          })
          })
    }
}
