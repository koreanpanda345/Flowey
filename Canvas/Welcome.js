const {Canvas} = require('canvas-constructor');
const fetch = require('node-fetch');
const superagent = require('node-superfetch');

module.exports = async (member, channel) => {
    const imageUrlRegex = /\>size=2048$/g;

    try{
        const result = await fetch(member.user.displayAvatarURL({format: "jpg"}).replace(imageUrlRegex, "?size=128"));
        if(!result.ok) throw new Error("Failed to get the avatar");
        const avatar = await result.buffer();
        const name = member.displayName.length > 20 ? member.displayName.substring(0, 17) + "..." : member.displayName;
        const {body: background} = await superagent.get('https://cdn.discordapp.com/attachments/673739882589454377/673759882658447385/2.png');
        Canvas.registerFont('./events/Guild/Level', "Level")
        let x = 200;
        let y = 266;
        let x2 = 100;
        let y2 = 63;
        let size1 = 50;
        let textX1 = 100;
        let textY1 = 150;
        let textX2 = 100;
        let textY2 = 200;
        return new Canvas(x, y)
        .addBeveledImage(background, 0,0,x,y)
        .setShadowColor("rgba(22, 22, 22, 1)")
        .setShadowOffsetY(5)
        .setShadowBlur(10)
        .addCircle(x2, y2, size1)
        .addCircularImage(avatar, x2, y2, size1)
        .setColor("#23272A")
        .setShadowColor("rgba(35, 39, 42, 1)")
        .addRect(0, 125, 200, 125)
        .save()
        .setTextAlign("center")
        .setTextFont("14pt Level")
        .setColor("#ffffff")
        .addText(`Welcome ${member.displayName} to`, textX1, textY1)
        .addText(`Thal's Garden`, textX1, textY1 + 25)
        .setTextFont("16pt level")
        .addText(`Please read the rules`, textX2, textY2)
        .addText(`and enjoy your stay!`, textX2, textY2 + 25)
        .toBuffer()
    } catch(e){
        await channel.send(`Something happened: ${e.message}`);
      }
}