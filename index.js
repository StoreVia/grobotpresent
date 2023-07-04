/**
   ____              _ _ _       
  / ___|_ __ ___  __| (_) |_ ___ 
 | |   | '__/ _ \/ _` | | __/ __|
 | |___| | |  __/ (_| | | |_\__ \
  \____|_|  \___|\__,_|_|\__|___/                              

 * Made By StoreVia Developers
 * Credits :- Professor & Team
 * Contact :- professor.js (Discord)
 * Version :- v1.1
 * BotName :- GroBot
 * Website :- https://www.grobot.store

*/

//packagesstart
const Client = require('./structures/Client');
const Discord = require(`discord.js`)
const client = new Client();
require('dotenv').config();
//packagesend

//clientstart
client.commands = new Discord.Collection();
client.categories = require("fs").readdirSync(`./D_Global_Slash`);
["Command", "Event", "RegisterSlash", "Logging", "AntiCrash"]
.filter(Boolean)
.forEach(h => {
  require(`./handler/${h}`);
})
//clientend


//discordplayerstart
client.player.events.on('audioTrackAdd', (queue, track) => {
  let embed = new Discord.EmbedBuilder()
    .setAuthor({
      name: `Added Song To Queue!`,
      iconURL: process.env.music_iconurl
    })
    .setThumbnail(`${track.thumbnail}`)
    .setDescription(`[${track.title}](${track.url})`)
    .addFields(
      { name: '**Author: **', value: `${track.author}`,inline: true },
      { name: `\u200b`, value: `\u200b`, inline: true },
      { name: '**Duration: **', value: `\`${track.duration}\``,inline: true },
    )
    .setColor(`${process.env.ec}`)
    .setFooter({
      text: `${client.user.username} - ${process.env.year} ©`,
      iconURL: process.env.iconurl
    })
  queue.metadata.channel.send({ embeds: [embed] });
});
client.player.events.on('audioTracksAdd', (queue) => {
  let embed = new Discord.EmbedBuilder()
    .setAuthor({
      name: `Added PlayList To Queue!`,
      iconURL: process.env.music_iconurl
    })
    
    .addFields(
      { name: '**No.OfSongs: **', value: `${queue.getSize()}`,inline: true },
    )
    .setColor(`${process.env.ec}`)
    .setFooter({
      text: `${client.user.username} - ${process.env.year} ©`,
      iconURL: process.env.iconurl
    })
  queue.metadata.channel.send({ embeds: [embed] });
});
client.player.events.on('playerStart', (queue, track) => {
  let embed = new Discord.EmbedBuilder()
    .setAuthor({
      name: `Now Playing ♪`,
      iconURL: process.env.music_iconurl
    })
    .setThumbnail(`${track.thumbnail}`)
    .setDescription(`[${track.title}](${track.url})`)
    .addFields(
      { name: '**Author: **', value: `${track.author}`,inline: true },
      { name: `\u200b`, value: `\u200b`, inline: true },
      { name: '**Duration: **', value: `\`${track.duration}\``,inline: true },
    )
    .setColor(`${process.env.ec}`)
    .setFooter({
      text: `${client.user.username} - ${process.env.year} ©`,
      iconURL: process.env.iconurl
    })
  queue.metadata.channel.send({ embeds: [embed] });
});
//discordplayerend

//clientloginstart
client.login().then(() => {
})
//clientloginend