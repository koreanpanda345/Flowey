const prefix = process.env.PREFIX;
const activity = "";
const status = "";

const list = [
  
    'If only… if only we had more time…',
    'I want to know what “I love you” truly means…',
    '"Back then, if we could have heard each others voices, everything would have been so much better."',
    'Would it be better if we never existed?',
    'What if..there was a world with no suffering?',
    '"No matter how deep the night, it always turns to day, eventually.”',
    '“I want you to be happy. I want you to laugh a lot. I don\’t know what exactly I\’ll be able to do for you, but I\’ll always be by your side.” ',
];
module.exports= (client) => {
  
if(status === "" || status === "online"){
    if(activity === ""){
    setInterval(() => {
        const index = Math.floor(Math.random() * (list.length - 1) + 1);
        client.user.setActivity(`${list[index]}`, {type: 'WATCHING'});
      client.user.setStatus('online');
    }, 10000);

    } else{
      client.user.setActivity(`${activity}`, {type: 'WATCHING'});
            client.user.setStatus('online');
    }
    
  }
  else if(status === "dnd"){
    client.user.setPresence(`Please wait... Mika is being worked on. Mika moans`,  {type: 'WATCHING'});
    client.user.setStatus('dnd');
}

console.log(`${client.user.username} is ready`);
}
