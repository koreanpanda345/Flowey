const {MessageEmbed} = require("discord.js");
const Airtable = require('airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');
module.exports = {
    name: "coinflip",
    aliases: ['coin', 'cf'],
    hasArgs: true,
    args: '<amount you are betting> <head or tails>',
    description: "Bet your flowers on a coin.",
    usage: `<amount you are betting> <head or tail>`,
    category: "Category",
    cooldown: 600000,
    execute(client, message, args){
        if(!args[0]) return message.channel.send(`Please enter the amount you want to bet.`);
        if(!args[1]) return message.channel.send(`Please enter if you want to bet on heads or tails.`);
        if(isNaN(args[0])) return message.channel.send(`Please enter a valid amount.`);
        if(args[1].toLowerCase() !== ("heads" || "head" || "tails" || "tail")) return message.channel.send(`Please enter either heads or tails`);
        let min = 100;
        let max = 250;
        if(args[0] < min || args[0] > max) return message.channel.send(`Please enter an amount between ${min} and ${max}.`);
        let amount = args[0];
        let side = args[1];
        let head = ["heads", "head"];
        let tail = ["tails", "tail"];
        let win;
        let rand = Math.floor(Math.random() * 2);
        console.log(rand);
        if(rand === 1)
        win = head;
        else
        win = tail;
        let embed = new MessageEmbed();
        if(win.includes(side)){
            
            embed.setTitle(`It is . . . ${win[0]}`);
            embed.setDescription(`You gain ${amount} flowers`);
            base(`Users`).select({
                filterByFormula: `{ID} = ${message.author.id}`
            }).eachPage(function page(records, fetchNextPage){
                let _record;
                let _bal;
                records.forEach(function(record){
                    _record = record.getId();
                    _bal = record.get('balance');
                });
                console.log(_bal + Number(amount));
                base(`Users`).update([{
                    'id': _record,
                    'fields': {
                        "balance": _bal + Number(amount)
                    }
                }], function(err, record){
                    if(err) console.error(err);
                })
            });
        }
        else{
            embed.setTitle(`It is . . . ${win[0]}`);
            embed.setDescription(`You Lose ${amount} flowers`);
            base(`Users`).select({
                filterByFormula: `{ID} = ${message.author.id}`
            }).eachPage(function page(records, fetchNextPage){
                let _record;
                let _bal;
                records.forEach(function(record){
                    _record = record.getId();
                    _bal = record.get('balance');
                });
                console.log(_bal + Number(amount));
                base(`Users`).update([{
                    'id': _record,
                    'fields': {
                        "balance": _bal - Number(amount)
                    }
                }], function(err, record){
                    if(err) console.error(err);
                })
            });
        }
        message.channel.send(embed);
    }
}
