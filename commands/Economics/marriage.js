const Airtable = require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
  //@ts-check
module.exports = {
  name: "marriage",
  aliases: ["marry", "propose"],
  hasArgs: true,
  args: "Who do you want propose to? **ex:** .marry @Thal#0068",
  usage: "<@who>",
  alias: "marry, propose",
  category: 'Economics',
  description: "Allows you to propose to someone",
  async execute(client, message, args) {
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    const filter = m => m.author.id === user.id && m.channel.id === message.channel.id;
    if(user.id === message.author.id) return message.channel.send(`You can't marry yourself.`);
      base('Users').select({
        filterByFormula: `{ID} = ${message.author.id}`,
      }).eachPage(function(records, fetchNextPage){
      records.forEach(function(record){
        if(record.get('marry') !== "No one") return message.channel.send(`You are already married to someone.`);
        message.channel.send(`${user.displayName}, ${message.author.tag} wants to marry you. what do you want to say?(say yes for yes, and no for no).`).then(() =>{
          message.channel.awaitMessages(filter, {max: 1, time: 600000, errors: ['time']})
          .then(collected => {
            if(collected.first().content.toLowerCase() === "yes"){
              let _record = record.getId();
              base('Users').select({
                filterByFormula: `{ID} = ${user.id}`,
              }).eachPage(function page(records, fetchNextPage){
                records.forEach(function(record){
                  let _user = record.id;
                  base('Users').update([{
                    "id": _record,
                    "fields":{
                      "marry": user.id,
                    }
                  },
                {
                  "id": _user,
                  "fields": {
                    "marry": message.author.id,
                  }
                }], function(err, record){
                  if(err) return console.log(err);
                 
                })
                })
              })
              message.channel.send(`${user.displayName} & ${message.author.tag} are now married`);
            }
            else if (collected.first().content.toLowerCase() === "no"){
              message.channel.send('They friendzoned you uwu');
            }
            else return message.channel('Unsuccessful');
          }).catch(collected => {
            message.channel.send(`Looks like they were not interested in you.`);
          })
        })
      })
      })
  }
};
