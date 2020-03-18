const Firebase = require('../../Module/Firebase');
const firebase = new Firebase();

module.exports = {
    name: "db",
    aliases: "firebase",
    description: "Allows Developers to test the Firebase db.",
    category: 'Dev',
    async execute(client, message, args){
        var desc = firebase.getUserData(message.author.id, 'desc');
        if(!args[0])
        firebase.createUserData(message.author.id, message.author.username, 1000, 0, 0, 1, 0, 0, "I am a Panda", ["bamboo"]);
        else if(args[0] === "search"){
            message.channel.send(desc);
        }
        else{
            let json = {
                desc: args.join(" ").split(0)
            };
            firebase.updateUserData(message.author.id, json);
        }

    }
}
