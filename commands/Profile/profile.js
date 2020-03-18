const {MessageAttachment}= require('discord.js');
const db = require('quick.db');
const canvas = require('../../Canvas/Profile.js');
const Airtable = require('airtable');
const AirTable = require('../../Module/Airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
module.exports = {
  name: "profile",
  description: "Displays your profile for the bot.",
  category: "Profile",
  cooldowns: 5,
  args: "(who)",
  async execute(client, message, args){

    let user;
    if(args[0]){
       user = message.mentions.members.first() || message.guild.members.get(args[0]);
    } 
    else if(!args[0]){
      user = message.member;
    }
    base('Users').select({
      filterByFormula: `{ID} = ${user.id}`,
    }).eachPage(function page(records, fetchNextPage){

    records.forEach(async function(record){
      if(record.get('ID') === user.id){

      
      let buffer = await canvas(user,
        record.get('level'),
        record.get('xp'),
        record.get('votes'),
        record.get('background'),
        record.get('marry'),
        record.get('description'),
        record.get('birthday'),
          message, client);
       const filename = `profile-${message.author.id}.png`;
       const attachment = new MessageAttachment(buffer, filename);
       await message.channel.send(attachment);
      }
    })
    })
    /*
    if(!db.has(`flower_${user.id}`)){
      db.set(`flower_${user.id}`, {balance: 0, votes: 0});
    }
    if(!db.has(`flower_${user.id}.desc`)){
      db.set(`flower_${user.id}.desc`, "No description");
    }*/
  
    
  }
}
