const malScraper = require('mal-scraper');
const Discord = require('discord.js');
module.exports = {
    name: 'anime',
    hasArgs: true,
    args: '<anime name>',
    description: 'Gets info about an anime.',
    category: 'Miscellaneous',
    execute(client, message, args){
        let term = args.join(" ");
        malScraper.getInfoFromName(term)
        .then((data) => {
            let embed = new Discord.MessageEmbed();
            embed.setTitle(`${data.title}`);
            embed.setURL(data.url);
            embed.setColor(0xffb6c1)
            embed.setDescription(`${data.synopsis}`);
            embed.setThumbnail(`${data.picture}`);
            embed.addField(`:leaves: Status`, data.status, true);
            embed.addField(':white_flower: Type', data.type, true);
            embed.addField(`:sunflower:  Genres`, data.genres.toString());
            embed.addField(`:rose: Aired`, data.aired);
            embed.addField(`:cherry_blossom: Total Episodes`, data.episodes, true);
            embed.addField(`:hibiscus: Duration`, data.duration, true);
            embed.addField(`:tulip: Average Rating`, `${data.score  === "N/A" ? `N/A` : `${data.score}/10.00`}`);
            embed.addField(`:blossom: Rank`, `**${data.ranked}**`);
            message.channel.send(embed);
            
        })
        .catch((err) => console.error(err));

    }
}
