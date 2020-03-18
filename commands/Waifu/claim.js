const Discord = require('discord.js');
const Airtable = require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
});
var base = Airtable.base('appI2X0jR7jcQvacQ');
module.exports ={
    name: "claim",
    hasArgs: true,
    args: "<@who>",
    category: "Waifu",
    execute(client, message, args){
        let _waifu = [];
        let waifu = "";
        let _lewd = [];
        let lewd = "";
        let _level = [];
        let level = "";
        let _feed = [];
        let feed = "";
        let _record = "";
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const filter = m => m.author.id === user.id && m.channel.id === message.channel.id;
        if(user.id === message.author.id) return message.channel.send(`You can't claim your self.`);
        base('Waifu').select({
            filterByFormula: `{userId} = ${message.author.id}`,
        }).eachPage(function page(records, fetchNextPage){
            if(!records.length){
                base('Waifu').create([{
                    fields: {
                        userId: message.author.id,
                        Waifus: "",
                        Levels: "",
                        Lewds: "",
                        Feeds: ""

                    }
                }], function(err, record){
                    if(err) return console.error(err);
                })
                //create a new record
            }
            records.forEach(function(record){
                _record = record.getId();
                let str = record.get(`Waifus`);
                waifu = str;
                for(let i = 0; i < str.split(",").length; i++){
                    _waifu.push(str.split(",")[i]);
                }
                str = record.get("Levels");
                level = str;
                for(let i = 0; i < str.split(",").length; i++){
                    _level.push(str.split(",")[i]);
                }
                str = record.get("Lewds");
                lewd = "";
                for(let i = 0; i < str.split(",").length; i++){
                    _lewd.push(str.split(","));
                }
                str = record.get("Feeds");
                feed = str;
                for(let i = 0; i < str.split(",").length; i++){
                    _feed.push(str.split(",")[i]);
                }
            });

            if(_waifu.length >= 5) return message.channel.send(`You can't claim any more waifus. you already reached the limit of 5`);
            message.channel.send(`${user.username}, ${message.author.tag} wants you as a waifu. do you accept?`).then(() => {
                message.channel.awaitMessages(filter, {max: 1, time: 6000000, error: ['time']})
                .then(collected => {
                    if(collected.first().content.toLowerCase() === "yes"){
                        base('Waifu').update([{
                            id: _record,
                            fields: {
                                "Waifus": waifu + "," + user.id,
                                "Levels": level + "," + "1",
                                "Lewds": lewd + "," + "0",
                                "Feeds": feed + "," + "100",
                            }
                        }], function(err, record){
                            if(err) return console.error(err);
                            return message.channel.send(`Yay, ${user.username} joined your harem.`);
                        })
                        //Add the user to the waifu list
                    }
                    else if(collected.first().content.toLowerCase() === "no"){
                        return message.channel.send(`Sorry, but they refused to join your harem.`)
                        //Return saying that they do not want to.
                    }
                    else {
                        return message.channel.send(`Sorry, but it looks like they were not interested in your harem.`);
                        //Return that they were not interested in the member's harem.
                    }
                })
            })
            
        });
    }
}
