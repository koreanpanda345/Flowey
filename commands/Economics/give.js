const Airtable = require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
//@ts-check
  module.exports = {
    name: "give",
    aliases :["transfer"],
    hasArgs: true,
    args: 'Who do you want to give flowers to?',
    usage: '<@who> <Amount>',
    alias: 'transfer',
    category: 'Economics',
    description: "Allows you to give a person flowers",
    async execute(client, message, args){
      const flower = message.guild.emojis.cache.find(e => e.name === "flower2");
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(user.id === message.author.id) return message.channel.send('You can not give yourself flowers silly.');
        if(!user) return message.channel.send("Can't find user!");
        
        let amount = args[1];
        if(isNaN(amount)) return message.channel.send("please enter a valid amount");
        base(`Users`).select({
            filterByFormula: `{ID} = ${message.author.id}`,
        }).eachPage(function page(records, fetchNextPage){
         records.forEach(function(record){
             let _record = record.getId();
             let _bal = record.get('balance');
             base('Users').select({
                 filterByFormula: `{ID} = ${user.id}`,
             }).eachPage(function page(records, fetchNextPage){
                 records.forEach(function(record){
                     let _user = record.getId();
                     let bal = record.get('balance');
                     let tax = 1;
                     if(Number(amount) <= 0) return message.channel.send('Sorry, but you can only give a minimum of 1 flower. What kind of a person are you to take from others?? Yikes..');
                     if(_bal < amount ) return message.channel.send("Sorry but you do not have enough.");
      

                     base('Users').update([{
                         "id": _record,
                         "fields":{
                             "balance": _bal - Number(amount),
                         }
                     },
                    {
                        "id": _user,
                        "fields":{
                            "balance": bal + Number(amount ),
                        }
                    }], function(err, records){
                         if(err) return console.error(err);
                         records.forEach(function(record){
                            
                         })
                       return message.channel.send(`**${message.member.displayName}** successfully transferred ${amount} ${flower} to **${user.displayName}** uwu`);
 
                     })
                   
                  
                 })
             })
         })
        })
        
            
        
    }
}
