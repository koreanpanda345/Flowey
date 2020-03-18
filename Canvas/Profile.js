const db = require('quick.db');
const {Canvas} = require('canvas-constructor');
const fetch = require('node-fetch');
const superagent = require('node-superfetch');

module.exports = async (member, level, xp, votes, _background, marry, desc, birthday, message, client) => {
    const flower2 = message.guild.emojis.cache.find(e => e.name === "flower2");
    const imageUrlRegex = /\>size=2048$/g;
    
    try{
      let user = "";
      const result = await fetch(member.user.displayAvatarURL({format: 'jpg'}));
      if(!result.ok) throw new Error("Failed to get the avatar");
      const avatar = await result.buffer();
      if(marry !== "No one"){
        let name = client.users.cache.find(m => m.id === marry);
        user = name.username;
      }
      let xpNeeded =  50 * (Math.pow(level + 1, 2)) - (50 * (level + 1));
      let current = 50 *(Math.pow(level - 1, 2)) - (50 * (level -1)) || 0;
     const {body: background} = await superagent.get(_background);
     Canvas.registerFont('./commands/Profile/Profile', "Profile");
     Canvas.registerFont('./commands/Profile/ProfileBold', "Profile-Bold");
      Canvas.registerFont('./Canvas/Captura-Thin', 'Captura-Thin');
     Canvas.registerFont('./Canvas/Comme-Regular', 'Comme-Regular');
     return new Canvas(300, 300)
      .addBeveledImage(background,0,0,300,300)
      .setGlobalAlpha(0.6)
      .setColor("#ffffff")
      .addRect(10, 160, 280 - 90, 130)
      .setGlobalAlpha(1.0)
      .setColor("#575c63")
      .setGlobalAlpha(0.7)
      .addRect(200, 160, 90, 130)
      .setGlobalAlpha(1.0)
      .setColor("#020202")
      .setGlobalAlpha(0.6)
      .addRect(10, 110, 280, 50)
      .setGlobalAlpha(1.0)
      .setColor("000000")
      .setShadowColor("rgba(22, 22, 22, 1)")
      .setShadowOffsetY(5)
      .setShadowBlur(10)
      .addRect(25, 63, 70, 70)
      .addBeveledImage(avatar, 20, 62, 83, 83)
      .setShadowColor("rgba(0, 0, 0, 0)")
      .setShadowOffsetY(0)
      .setShadowBlur(0)
      //black bar
      .setColor("#36393f") 
      .addRect(120,140, 160, 17)
      //Xp progress 
      .setColor("#A8A8A8")
      .addRect(120, 140, Math.floor((((xp - current)/xpNeeded) / 0.625) * 100), 17)
      .save()
      .restore()
      .setColor("#000000")
      .setTextFont('10px Comme-Regular')
      .addText(`Married to: `, 20, 260)
      .addText(`${user}`, 25, 272)
      .addText(`Votes: ${votes}`, 20, 284)
      .setTextFont('10px Comme-Regular')
      .addText(`Birthday: ${birthday}`, 20, 180)
      .setTextFont('10px Comme-Regular')
      .addWrappedText(`Description: ${desc}`, 20, 200, 180)
      .setColor("#ffffff")
      .setTextFont('20px Comme-Regular')
      .addText(`LEVEL ${level}`, 125, 135)
      .setTextFont('13px Comme-Regular')
      .addText(`${xp} / ${xpNeeded}`, 160, 153)
      .toBuffer();
  
    } catch(e){
      await message.channel.send(`Something happened: ${e.message}`);
    }
}
