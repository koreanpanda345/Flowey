const {Canvas} = require('canvas-constructor');
const fetch = require('node-fetch');
const superagent = require('node-superfetch');
module.exports = async (users, message, client) => {
    const imageUrlRegex = /\>size=2048$/g;

    try{
        const {body: heart} = await superagent.get("https://media.discordapp.net/attachments/541809522357043203/682422355842170899/hear.PNG?width=461&height=407");
        const result_1 = await fetch(users[0].displayAvatarURL.replace(imageUrlRegex, "?size=128"));
        const result_2 = await fetch(users[1].displayAvatarURL.replace(imageUrlRegex, "?size=128"));
        
        if(!result_1.ok) throw new Error("Failed to get the first user's avatar.");
        if(!result_2.ok) throw new Error("Failed to get the second user's avatar.");
        
        const avatar_1 = await result_1.buffer();
        const avatar_2 = await result_2.buffer();
        let name_1 = users[0].username.split("");
        let name_2 = users[1].username.split("");
        let cut_1 = Math.floor(Math.round(name_1.length/2));
        let cut_2 = Math.floor(Math.round(name_2.length/2));
        let shipName = `${users[0].username.slice(0, cut_1)}${users[1].username.slice(cut_2)}`;
       
        return new Canvas(325, 150)
        .addBeveledImage(avatar_1, 5, 25, 100, 100)
        .addBeveledImage(heart, 105, 25, 100, 100)
        .addBeveledImage(avatar_2, 210, 25, 100, 100)
        .toBuffer();

    }
    catch(e){
        await message.channel.send(`Something happened: ${e.message}`);
    }
}
