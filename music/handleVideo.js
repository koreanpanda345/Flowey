const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.YT_KEY);
const { Client, Util } = require("discord.js");
const Discord = require("discord.js");
var Stopwatch = require("stopwatch-emitter").Stopwatch;
const queue = new Map();

/**
 * @param {Object} video video object.
 * @param {Object} message The message event from discord.js.
 * @param {Object} voiceChannel The Voice channel that the user is in.
 * @param {Boolean} playlist whether its a playlist or not.
 * @return {Promise<(Message|<Arrary<Message>)>} will send the songAddedEmbed
 */
async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    channel: video.channel.title,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    durationh: video.duration.hours
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 3,
      playing: true
    };
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send(
        `I could not join the voice channel: ${error}`
      );
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    let songAddedEmbed = new Discord.MessageEmbed()
      .setTitle(`${song.title} has been added to the queue`)
      .setColor(`0xff3262`)
      .addField(`Publisher: `, `${song.channel}`, true)
      .addField("Video ID: ", song.id, true)
      .addField(
        `Duration: `,
        `**${song.durationh}** hours: **${song.durationm}** minutes: **${song.durations}** seconds`
      )
      .setThumbnail(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
      .setDescription(
        `[${song.title}](https://www.youtube.com/watch?v=${song.id}})`
      );
    if (playlist) return undefined;
    else return message.channel.send(songAddedEmbed);
  }
  return undefined;
}
/**
 * @param {Object} guild - the guild the user is in.
 * @param {Object} track - the track that will be played.
 */
let playTrack = function(guild, track) {
  const trackQueue = trackPush.get(guild.id);
  console.log(trackQueue.tracks);
  if (!track) {
    trackQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(trackQueue.tracks);
  const dispatcher = trackQueue.connection
    .playFile(track)
    .on("end", reason => {
      console.log(reason);
      console.log(trackQueue.tracks[0]);
      trackQueue.tracks.shift();
      playTrack(guild, trackQueue.tracks[0]);
      console.log(trackQueue.tracks[0]);
    })
    .on("error", error => console.error(error));
  setTimeout(function() {
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    trackQueue.textChannel.send("successful");
  }, 500);
};
let play = function(guild, song) {
  const serverQueue = queue.get(guild.id);
  console.log(serverQueue.songs);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    console.log(serverQueue.songs);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song ended.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  setTimeout(function() {
    let durationTime = (song.durationh / 60 + song.durationm) / 60 + song.durations;
    var stopwatch = new Stopwatch(durationTime);
    stopwatch.getRemainingTime();
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    let songEmbed = new Discord.MessageEmbed()
      .setColor(`0xff3262`)
      .addField(`Publisher: `, `${song.channel}`, true)
      .addField("Video ID: ", song.id, true)
      .addField(
        `Duration: `,
        `**${song.durationh}** hours: **${song.durationm}** minutes: **${song.durations}** seconds`
      )
      .setThumbnail(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
      .setDescription(
        `[${song.title}](https://www.youtube.com/watch?v=${song.id}})`
      );

    serverQueue.textChannel.send(songEmbed);
  }, 500);
};

module.exports = { handleVideo, queue, youtube };
