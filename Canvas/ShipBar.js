const {Canvas} = require('canvas-constructor');
const fetch = require('node-fetch');
const superagent = require('node-superfetch');
module.exports = async (message, randNum) => {
    const imageUrlRegex = /\>size=2048$/g;

    try{

        return new Canvas(100, 17)
        .setColor("#92c3df")
        .addRect(0,0, 100, 17)
        .setColor("#062843")
        .addRect(0, 0, randNum, 17)
        .toBuffer();

    }
    catch(e){
        await message.channel.send(`Something happened: ${e.message}`);
    }
}
