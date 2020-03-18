
module.exports = {
  name: "say",
  description: "Says what you want it to say.",
  hasArgs: true,
  args: "What do you want me to say?",
  category: "Miscellaneous",
  execute(client, message, args){
    let say = args.join(" ").slice(0);
    message.channel.send(say).then(() => {
      message.delete()
    });
  }
}