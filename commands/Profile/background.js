//@ts-check
const { MessageEmbed } = require("discord.js");
const Airtable = require("airtable");
const AirTable = require("../../Module/Airtable");
const api = process.env.AIRTABLE;
//@ts-ignore
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: api
});
//@ts-ignore
var base = Airtable.base("appI2X0jR7jcQvacQ");
module.exports = {
  name: "background",
  aliases: ["bg"],
  description: "Allows you to change the background of your profile.",
  usage:
    "To view all Backgrounds -> `.bg`\nTo Buy a new background -> `.bg buy <background id>`\nTo view a background before buying -> `.bg view <background id>`\nTo see the backgrounds you own -> `.bg own`\n To set your background -> `.bg set <background id that you own>`",
  category: "Profile",
  execute(client, message, args) {
    const crystal = message.guild.emojis.cache.find(e => e.name === "ThalNitroBoost");
    const dev = message.guild.emojis.cache.find(e => e.name === "ZeusDrink");
    const left = message.guild.emojis.cache.find(e => (e.name = "LeftArrow"));
    const right = message.guild.emojis.cache.find(e => (e.name = "RightArrow"));
    base("Backgrounds")
      .select({
        maxRecords: 100,
        sort: [{ field: "price", direction: "asc" }]
      })
      .eachPage(function page(records, fetchNextPage) {
        let price = [];
        let bg = [];
        let bgName = [];
        let desc = " ";
        let _nitro = [];
        let _dev = [];
        let page = 1;
        let pages = [];
        console.log(records.length);
        records.forEach(function(record) {
          bg.push(record.get("url"));
          bgName.push(record.get("Name"));
          price.push(record.get("price"));
          _nitro.push(record.get("Nitro"));
          _dev.push(record.get("Dev"));
        });
        let pageAmount = 10;
        for (let i = 0; i < Math.floor(Math.round(bg.length / 10)); i++) {
          for (let n = 1 + pageAmount - 11; n < pageAmount; n++) {
            if (n !== 0)
              desc += `__**ID: ${n}**__ |  *${bgName[n - 1]}*  - __**${
                _nitro[n - 1] === true
                  ? `${crystal}`
                  : _dev[n - 1] === true
                  ? `${dev}`
                  : price[n - 1] !== 0
                  ? price[n - 1]
                  : "Free"
              }**__\n`;
          }
          pageAmount += 10;
          pages.push(desc);
          desc = " ";
        }
        if (!args[0]) {
          let embed = new MessageEmbed();
          embed.setTitle(`Available Backgrounds`);
          embed.setDescription(pages[page - 1]);
          embed.setColor(0xffd1dc);
          embed.setFooter(`Page ${page} of ${pages.length}`);
          return message.channel.send(embed).then(msg => {
            msg.react("678784712969289729").then(r => {
              msg.react("678784396328697880");

              let backfilter = (reaction, user) =>
                reaction.emoji.name === `LeftArrow` &&
                user.id === message.author.id;
              let forwardFilter = (reaction, user) =>
                reaction.emoji.name === `RightArrow` &&
                user.id === message.author.id;
              const backwards = msg.createReactionCollector(backfilter, {
                time: 300000
              });
              const forwards = msg.createReactionCollector(forwardFilter, {
                time: 300000
              });

              backwards.on("collect", () => {
                if (page === 1) return;
                --page;
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
              });
              forwards.on("collect", () => {
                if (page === pages.length) return;
                ++page;
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
              });
            });
          });
        } else if (args[0] === "view") {
          let embed = new MessageEmbed();
          embed.setTitle(`Preview of ${bgName[args[1] - 1]}`);
          embed.setDescription(
            `Price: ${
              _dev[args[1] - 1] === true
                ? `${dev}`
                : _nitro[args[1] - 1]
                ? `${crystal}`
                : price[args[1] - 1] === 0
                ? "Free"
                : `${price[args[1] - 1]}`
            }`
          );
          embed.setImage(bg[args[1] - 1]);
          embed.setColor(0xa1dbff);
          return message.channel.send(embed);
        } else if (args[0] === "own") {
          base("Users")
            .select({
              filterByFormula: `{ID} = ${message.author.id}`
            })
            .eachPage(function page(records, fetchNextPage) {
              let _ownBg = [];
              let _ownName = [];
              let desc = " ";

              records.forEach(function(record) {
                let str = record.get("ownBgName");
                let url = record.get("ownBgUrl");
                if (str !== ("" || null || undefined)) {
                  if (str.split(" ").length > 0) {
                    for (let i = 0; i < str.split(" ").length; i++) {
                      _ownName.push(str.split(" ")[i]);
                    }
                    for (let i = 0; i < url.split(" ").length; i++) {
                      _ownBg.push(url.split(" ")[i]);
                    }
                    for (let i = 0; i < _ownName.length; i++) {
                      desc += `${i + 1} - ${_ownName[i]}\n`;
                    }
                  }
                } else desc = "You don't currently have any backgrounds.";
              });

              let embed = new MessageEmbed();
              embed.setDescription(desc);
              embed.setColor(0xa1dbff);
              message.channel.send(embed);
            });
        } else if (args[0] === "set") {
          //if(!isNaN(args[1])) return message.channel.send(`Please enter a vaild background id.`);
          if (!args[1])
            return message.channel.send(
              `What background you want to set your profile picture to be?`
            );
          base("Users")
            .select({
              filterByFormula: `{ID} = ${message.author.id}`
            })
            .eachPage(function page(records, fetchNextPage) {
              let _ownBg = [];
              let _ownName = [];
              let _record;
              records.forEach(function(record) {
                _record = record.getId();
                let str = record.get("ownBgName");
                let url = record.get("ownBgUrl");
                for (let i = 0; i < str.split(" ").length; i++) {
                  _ownName.push(str.split(" ")[i]);
                }
                for (let i = 0; i < url.split(" ").length; i++) {
                  _ownBg.push(url.split(" ")[i]);
                }
              });
              if (_ownBg.length < args[1] - 1)
                return message.channel.send(
                  "Sorry but you do not own this background yet."
                );
              if (_ownBg[args[1] - 1] === undefined) return;
              base("Users").update(
                [
                  {
                    id: _record,
                    fields: {
                      background: _ownBg[args[1] - 1]
                    }
                  }
                ],
                function(err, record) {
                  if (err) return console.error(err);
                  let embed = new MessageEmbed();
                  embed.setTitle(
                    `Changed your background to ${_ownName[args[1] - 1]}`
                  );
                  embed.setImage(_ownBg[args[1] - 1]);
                  embed.setColor(0xa1dbff);
                  return message.channel.send(embed);
                }
              );
            });
        } else if (args[0] === "buy") {
          if (Number(args[1]) > bg.length + 1)
            return message.channel.send(
              `Sorry but that is not a background at the moment.`
            );
          base(`Users`)
            .select({
              filterByFormula: `{ID} = ${message.author.id}`
            })
            .eachPage(function page(records, fetchNextPage) {
              records.forEach(function(record) {
                let _record = record.getId();
                let ownName = record.get("ownBgName");
                let ownBgUrl = record.get("ownBgUrl");
                let _ownName = [];
                console.log(ownName);
                if (ownName !== undefined) {
                  for (let i = 0; i < ownName.split(" ").length; i++) {
                    _ownName.push(ownName.split(" ")[i]);
                  }
                  for (let i = 0; i < _ownName.length; i++) {
                    if (_ownName[i] === bgName[args[1] - 1])
                      return message.channel.send("You already own this.");
                  }
                }
                base("Users")
                  .select({
                    filterByFormula: `{ID} = ${message.author.id}`
                  })
                  .eachPage(function page(records, fetchNextPage) {
                    let _bal = 0;
                    let devRole = message.guild.roles.find(
                      r => r.name === "Bot Developer"
                    );
                    if (_dev[args[1] - 1] && 
                      !message.member.roles.has(devRole.id))
                      return message.channel.send(
                        `Sorry but, this is a Developer Exclusive.`
                      );
                    let nitroRole = message.guild.roles.find(
                      r => r.name === "Nitro Flower"
                    );
                    if (
                      _nitro[args[1] - 1] &&
                      !message.member.roles.has(nitroRole.id)
                    )
                      return message.channel.send(
                        `Sorry but, this is a Nitro Booster exclusive background. Please boost the server in order to unlock this.`
                      );
                    if (bg === undefined || bg === null || bg[0] === "undefined")
                      return message.channel.send(
                        `Sorry but there was an error. PLEASE TELL THAL TO ABOSE PANDA`
                      );
                    if (record.get("balance") < price[args[1] - 1])
                      return message.channel.send(
                        "Sorry but you do not have enough to buy this yet."
                      );

                    records.forEach(function(record) {
                       _bal = record.get("balance");
                    });

                    base("Users").update(
                      [
                        {
                          id: _record,
                          fields: {
                            background: bg[args[1] - 1],
                            balance: _bal - price[args[1] - 1],
                            ownBgName: ownName + " " + bgName[args[1] - 1],
                            ownBgUrl: ownBgUrl + " " + bg[args[1] - 1]
                          }
                        }
                      ],
                      function(err, records) {
                        if (err) return console.error(err);
                        let embed = new MessageEmbed();
                        embed.setTitle(
                          `You have bought *${bgName[args[1] - 1]}* Background`
                        );
                        embed.setImage(bg[args[1] - 1]);
                        embed.setColor(0xa1dbff);
                        message.channel.send(embed);
                      }
                    );
                    /*
                     base('User-Backgrounds').create([{
                         "fields":{
                             "ID": message.author.id,
                             "url": bg[args[0] - 1]
                         }
                     }], function(err, records){
                         if(err) return console.error(err);
                     })*/
                  });
              });
            });
        }
      });
  }
};
