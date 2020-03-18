const {readdirSync} = require('fs');

module.exports = (client) => {
    const load = dirs =>{
        const commands = readdirSync(`./commands/${dirs}`).filter(d => d.endsWith('.js'));
        for(let file of commands){
            const cmd = require(`../commands/${dirs}/${file}`);
            client.commands.set(cmd.name, cmd);
        }
    }
    [
        "Miscellaneous",
         "Economics",
          "Moderation",
           "Music",
            "Reactions",
             "Profile",
              "Nsfw",
              "Waifu",
             //"Dev"
            ].forEach(x => load(x));
}
