const Airtable = require("airtable");
const api = process.env.AIRTABLE;
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: api
});
var base = Airtable.base("appI2X0jR7jcQvacQ");
//@ts-check
module.exports = {
  name: "buy",
  description: "Allows you to buy items from the shop",
  hasArgs: true,
  args: "What item do you want to buy?",
  category: "Economics",
  async execute(client, message, args) {
    const flower = message.guild.emojis.cache.find(e => e.name === "flower2");

    if (isNaN(args[0]))
      return message.channel.send("Please enter a valid item id.");
    console.log(args[0]);

    base("Shop")
      .select({
        filterByFormula: `{id} = ${args[0]}`
      })
      .eachPage(function page(records, fetchNextPage) {
        if (!records.length)
          return message.channel.send(`Sorry but, that item doesn't exist.`);
        records.forEach(function(record) {
          let price = record.get("Price");
          let name = record.get("Name");
          let id = record.get("id");
          base("Users")
            .select({
              filterByFormula: `{ID} = ${message.author.id}`
            })
            .eachPage(function page(records, fetchNextPage) {
              records.forEach(function(record) {
                if (record.get("balance") < price)
                  return message.channel.send(
                    "Sorry, but you do not have enough."
                  );
                let _record = record.getId();
                let _bal = record.get("balance");
                base("Users").update(
                  [
                    {
                      id: _record,
                      fields: {
                        balance: _bal - Number(price)
                      }
                    }
                  ],
                  function(err, records) {
                    if (err) return console.error(err);
                    base("inventory")
                      .select({
                        filterByFormula: `{user} = ${message.author.id}`
                      })
                      .eachPage(function page(records, fetchNextPage) {
                        if (!records.length) {
                          base("inventory").create(
                            [
                              {
                                fields: {
                                  user: message.author.id,
                                  item: name
                                }
                              }
                            ],
                            function(err, record) {
                              if (err) return console.error(err);
                            }
                          );
                        } else {
                          let item;
                          let _id;
                          records.forEach(function(record) {
                            item = record.get("item");
                            _id = record.getId();
                          });
                          base("inventory").update(
                            [
                              {
                                id: _id,
                                fields: {
                                  user: message.author.id,
                                  item: item + " " + name
                                }
                              }
                            ],
                            function(err, record) {
                              if (err) return console.error(err);
                              if (name === "Bamboo") {
                                const role = message.guild.roles.cache.find(role => role.id === '687519207591641204');
                                if (
                                  !message.member.roles.cache.some(role => role.id === '687519207591641204')
                                ) {
                                  message.member.roles.add(role);
                                }
                              }
                              return message.channel.send(
                                `You just bought a ${name}.`
                              );
                            }
                          );
                        }
                      });
                  }
                );
              });
            });
        });
      });
  }
};
