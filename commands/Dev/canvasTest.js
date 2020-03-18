const {Canvas} = require('canvas-constructor');
const {Attachment}= require('discord.js');
const Airtable = require('airtable');
const AirTable = require('../../Module/Airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE
  });
  var base = Airtable.base('appI2X0jR7jcQvacQ');

  module.exports = {
      name: "xp",
      description: "displays the progress bar test canvas",
    category: 'Dev',
      async execute(client, message, args){
          let xp = 7500;
          let xpNeeded = 10000;
        let buffer = new Canvas(300, 300)
        .setColor("#aedfe4")
        .addRect(0,0, 300, 300)
        .setColor("#ffffff")
        .addRect(20,150, 160, 17)
        .setColor("#fe46a5")
        .addRect(20, 150, Math.floor(((xp/xpNeeded) / 0.625) * 100), 17)
        .save()
        .restore()
        .setColor("#000000")
        .setTextFont("12px Impact")
        .setTextAlign("center")
        .addText(`${xp} / ${xpNeeded}`, 90, 163)
        .toBuffer();

        const filename = `profile-${message.author.id}.png`;
        const attachment = new Attachment(buffer, filename);
        await message.channel.send(attachment);
      }
  }
