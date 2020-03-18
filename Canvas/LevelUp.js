const db = require("quick.db");
const { Canvas } = require("canvas-constructor");
const superagent = require("node-superfetch");
const fetch = require("node-fetch");
const Discord = require("discord.js");
/**
 * @param {GuildMember} member the user.
 * @param {Promise<(Message)>} message the message event.
 * @param {Number} level the user's level.
 */
module.exports = async (member, message, level) => {
  const flower2 = message.guild.emojis.cache.find(e => e.name === "flower2");
  const imageUrlRegex = /\>size=2048$/g;
  let user = member;
  try {
    const result = await fetch(
      member.user.displayAvatarURL({format: 'jpg'}).replace(imageUrlRegex, "?size=128")
    );
    if (!result.ok) throw new Error("Failed to get the avatar");
    const avatar = await result.buffer();
    const name =
      member.displayName.length > 20
        ? member.displayName.substring(0, 17) + "..."
        : member.displayName;
    const { body: background } = await superagent.get(
      "https://media.discordapp.net/attachments/673033247424249857/673062291855638528/okk.jpg"
    );
    Canvas.registerFont("./events/Guild/Level", "Level");
    return new Canvas(300, 90)
      .addRect(42, 0, 216, 90)
      .save()
      .addBeveledImage(background, 0, 0, 300, 90)
      .setColor("#585860") //"#23272A"
      .addRect(0, 0, 45, 90)
      .addRect(125, 55, 150, 25)
      .addRect(125, 25, 150, 25)
      .setShadowColor("rgba(22, 22, 22, 1)")
      .setShadowOffsetY(5)
      .setShadowBlur(10)
      .addCircle(45, 45, 35)
      .addCircularImage(avatar, 45, 45, 35)
      .setColor("#ffb6c1")
      .save()
      .createBeveledClip(20, 138, 128, 32, 5)
      .setColor("#2C2F33") //"#2C2F33"
      .fill()
      .restore()
      .setTextAlign("center")
      .setTextFont("15px Level")
      .setColor("#ffffff")
      .addText(`Leveled Up!`, 195, 42)
      .addText(`LVL: ${level}`, 195, 75)
      .toBuffer();
  } catch (e) {
    await message.channel.send(`Something happened: ${e.message}`);
  }
  
};
