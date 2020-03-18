const canvas = require('../../Canvas/Ship.js');
const CanvasBar = require('../../Canvas/ShipBar.js');
const {Attachment, MessageEmbed}= require('discord.js');

module.exports = {
    name: "ship",
    hasArgs: true,
    args: "Who do you want to ship?",
    description: "Ships two people together~",
    category: "Miscellaneous",
    async execute(client, message, args){
        let users = [];
        if(message.mentions.users.size === 1) return message.channel.send("You cannot ship your self.")
        message.mentions.users.map(user => {
            users.push(user);
        });
    
        const randNum = Math.floor(Math.random() * 100);
    let buffer = await canvas(users, message, client);
    let bufferBar = await CanvasBar(message, randNum);
    const filename = `ship-${users[0].username}x${users[1].username}.png`;
    const barFile = `ship_bar-${users[0].username}x${users[1].username}.png`;
       const attachment = new Attachment(buffer, filename);
       const bar = new Attachment(bufferBar, barFile);
       let embed = new MessageEmbed()
       .setTitle(`${users[0].username} ♡ ${users[1].username}`)
       await message.channel.send(embed);
       await message.channel.send(`${randNum}%`,bar);
       await message.channel.send(attachment);
  
    }
}
