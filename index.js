/**
   ____              _ _ _       
  / ___|_ __ ___  __| (_) |_ ___ 
 | |   | '__/ _ \/ _` | | __/ __|
 | |___| | |  __/ (_| | | |_\__ \
  \____|_|  \___|\__,_|_|\__|___/                              

 * Made By StoreVia Developers
 * Credits :- Professor.#1974 (Discord)
 * Version :- v1.1
 * BotName :- GroBot
 * Website :- https://www.grobot.store

*/

//packagesstart
const Client = require('./structures/Client');
require('dotenv').config();
const canvacord = require("canvacord");
const Discord = require(`discord.js`)
const Canvas = require('canvas');
const db = require(`quick.db`)
const version = require(`./package.json`).version;
const { GiveawaysManager } = require("./B_Gro_Modules/discord-giveaways");
const client = new Client();
const canv = require('canvas'),
	canvas = canv.createCanvas(1018, 468),
	ctx = canvas.getContext('2d')
const { loadImage } = require(`canvas`)
const { Captcha } = require("discord.js-captcha");
const moment = require('moment');
const titlecase = require(`title-case`)
const { readdirSync } = require("fs");
const colors = require("colors");
const { DiscordTogether } = require('discord-together');
const fetch = require(`node-fetch`);
const { Player } = require('discord-player');
//packagesend

//clientextensionsstart
client.player = new Player(client);
client.discordTogether = new DiscordTogether(client);
client.commands = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);
["Command", "Event", "RegisterSlash"]
.filter(Boolean)
.forEach(h => {
  require(`./handler/${h}`);
})
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaway_utility/giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: process.env.ec,
    embedColorEnd: process.env.ec,
    reaction: "🎉"
  }
});
//clientextensionsend

//consoleloggingstart
try {
  let stringlength = 69;
  console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + `Loading Slash Commands`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Loading Slash Commands`.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)

  let amount = 0;
  readdirSync("./commands/").forEach((dir) => {
  const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
    for (let file of commands) {
      let pull = require(`./commands/${dir}/${file}`);
      console.log( 
        colors.red(`Slash : `) + colors.green(`${dir} : `) + colors.yellow(file + " - " + "File Was Loaded")
      );
      if (pull.name) {
        client.commands.set(pull.name, pull);
        amount++;
      } else {
        console.log(file, `error -> missing a help.name, or help.name is not a string.`.brightRed);
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
    }
  });
  console.log(`${amount} Slash Command Files Loaded.`.brightGreen);
} catch (e) {
    console.log(String(e.stack).bgRed)
}
//consoleloggingend

//errorhandlingstart
process.on('unhandledRejection', (reason, p) => {
  console.log(' [ AntiCrashDetection ]:- Unhandled Rejection/Catch');
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(' [ AntiCrashDetection ]:- Uncaught Exception/Catch');
  console.log(err, origin);
}) 
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(' [ AntiCrashDetection ]:- Uncaught Exception/Catch (MONITOR)');
  console.log(err, origin);
});
//errorhandlingend

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
      { name: '**Duration: **', value: `\`${track.duration}\``,inline: true },
      { name: '**RequestedBy: **', value: `${track.requestedBy}`,inline: true },
    )
    .setColor(`${process.env.ec}`)
    .setFooter({
      text: `${client.user.username} - ${process.env.year} ©`,
      iconURL: process.env.iconurl
    })
  queue.metadata.channel.send({ embeds: [embed] });
});
client.player.events.on('playerStart', (queue, track) => {
    queue.metadata.channel.send({ content: `Started playing **${track.url}**!`});
});

//discordplayerend

//clientloginstart
client.login().then(() => {
})
//clientloginend