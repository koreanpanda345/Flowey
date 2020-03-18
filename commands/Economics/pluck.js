const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const Airtable = require('airtable');
const AirTable = require('../../Module/Airtable');
const api = process.env.AIRTABLE;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: api
});
var base = Airtable.base('appI2X0jR7jcQvacQ');
module.exports = {
    name: "pluck",
    aliases: ["pl"],
    description: "Allows you to pluck flowers and take them back to your garden",
    category: "Economics",
    cooldowns: 1,
    execute(client, message, args) {
        if (db.has(`${message.author.id}.pluck`)) {
            if (Date.now() <= db.get(`${message.author.id}.pluck`)) {
                const timeLeft = (db.get(`${message.author.id}.pluck`) - Date.now());
                const timeLeftSeconds = (Math.floor((timeLeft / 1000) % 60));
                const timeLeftMinutes = (Math.floor((timeLeft / (1000 * 60)) % 60));
                const timeLeftHours = (Math.floor((timeLeft / (1000 * 60 * 60)) % 60));
                if (timeLeftHours >= 1)
                    return message.reply(`Please wait ${timeLeftHours} hours, ${timeLeftMinutes} minutes, and ${timeLeftSeconds.toFixed(1)} more second(s) before reusing the \`pluck\` command.`);
                else if (timeLeftMinutes >= 1)
                    return message.reply(`Please wait ${timeLeftMinutes} minutes, and ${timeLeftSeconds.toFixed(1)} more second(s) before reusing the \`pluck\` command.`);
                else
                    return message.reply(`Please wait ${timeLeftSeconds.toFixed(1)} second(s) before reusing the \`pluck\` command.`);
            }
        }
        let payment = Math.floor((Math.random() + 0.01) * 70);
        const flower = message.guild.emojis.cache.find(e => e.name === "flower2");

        base(`Users`).select({
            filterByFormula: `{ID} = ${message.author.id}`,
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                let _record = record.getId();
                let _bal = record.get('balance');
                base('Users').update([{
                    "id": _record,
                    "fields": {
                        "balance": _bal + payment
                    }
                }], function (err, records) {
                    if (err) return console.error(err);
                    records.forEach(function (record) {
                        let embed = new MessageEmbed();
                        embed.setColor(0xafdd93);
                        embed.setTitle(`You quickly plucked some flowers from the nearby garden`);
                        embed.setDescription(`You got ${payment} ${flower} flowers!`);

                        message.channel.send(embed);
                        db.set(`${message.author.id}.pluck`, Date.now() + (60 * 1000));
                    })
                })
            })
        })
    }
}
