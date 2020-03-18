const db = require('quick.db');
const Airtable = require('airtable');
const api = process.env.AIRTABLE;
const AirTable = require('../Module/Airtable');
const {MessageAttachment} =require('discord.js');
const levelUp = require('../Canvas/LevelUp.js')
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
module.exports = async (message, xpAdd) => {
    base('Users').select({
        filterByFormula: `{ID} = ${message.author.id}`,
    }).eachPage(function page(records, fetchNextPage){
        if(!records.length){
            let air = new AirTable();
            air.CreateUser({id: message.author.id});
        }
        records.forEach(function(record){
            let _record = record.getId();
            let _xp = record.get('xp');
            let _bal = record.get('balance');
            base('Users').update([{
                "id": _record,
                "fields": {
                    "xp": _xp + 1,
                    "balance": _bal + 1,
                }
            }], function(err, records){
                if(err) return console.error(err);
                records.forEach(function(record){
                    let NxtLVL =  50 * (Math.pow(record.get('level') + 1, 2)) - (50 * (record.get('level') + 1));
                    if(Math.floor(Math.round(NxtLVL)) <= record.get('xp')){
                        let _level = record.get('level');
                        base('Users').update([{
                            "id": _record,
                            "fields": {
                                "level": _level + 1,
                            }
                        }], async function(err, records){
                            if(err) return console.error(err);
                            let buffer = await levelUp(message.member, message, _level + 1 || 0);
                            const filename = `LevelUp-${message.author.id}.jpg`;
                            const attachment = new MessageAttachment(buffer, filename);
                            await message.channel.send(attachment);
                        })
                    }
                })
            })
        });
    }, function done(error){});
}
