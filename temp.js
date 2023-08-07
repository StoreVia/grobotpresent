const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const parsec = require("parsec");
const { GiveawaysManager } = require("discord-giveaways");
const config = require("../../B_Custom_Dbs/giveawaydb/config.json");
messages = require("../../B_Custom_Dbs/giveawaydb/message");

module.exports = {
  name: "gcreate",
  category: "",
  aliases: ["gc"],
  cooldown: 3,
  usage: "",
  description: "",
  memberpermissions: ["MANAGE_GUILD"],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {

    const collector = message.channel.createMessageCollector({
      filter: (m) => m.author.id === message.author.id,
      time: 60000,
    });

    let xembed = new MessageEmbed()
      .setTitle("Timeout!")
      .setColor(`${process.env.ec}`)
      .setDescription(
        `Now You Can't Give Response To This Giveaway Command. To Use This Command Type Again.`,
      )
      .setFooter({
        text: `${client.user.username} - 2022 ©`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();

    function waitingEmbed(title, desc) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("Giveaway " + title)
            .setDescription(desc + " within the next 60 seconds.")
            .setFooter({
              text: "Type 'cancel' to exit this process.",
              iconURL: client.user.displayAvatarURL(),
            })
            .setTimestamp()
            .setColor(`${process.env.ec}`),
        ],
      });
    }

    let winnerCount, channel, duration, prize, cancelled;

    await waitingEmbed("Prize", "Please send the giveaway prize");

    collector.on("collect", async (m) => {
      if (cancelled) return;

      async function failed(options, ...cancel) {
        if (typeof cancel[0] === "boolean")
          (cancelled = true) && (await m.reply(options));
        else {
          await m.reply(
            options instanceof MessageEmbed ? { embeds: [options] } : options,
          );
          return await waitingEmbed(...cancel);
        }
      }

      if (m.content === "cancel") {
        collector.stop();
        return await failed("> Cancelled Giveaway Creation.", true);
      }

      switch (true) {
        case !prize: {
          if (m.content.length > 256)
            return await failed(
              "The prize can not be more than 256 characters.",
              "Prize",
              "Please send the giveaway prize",
            );
          else {
            prize = m.content;
            await waitingEmbed("Channel", "Please send the giveaway channel");
          }

          break;
        }

        case !channel: {
          if (
            !(_channel =
              m.mentions.channels.first() ||
              m.guild.channels.cache.get(m.content))
          )
            return await failed(
              "Please send a valid channel / channel ID.",
              "Channel",
              "Please send the giveaway channel",
            );
          else if (!_channel.isText())
            return await failed(
              "The channel must be a text channel.",
              "Channel",
              "Please send the giveaway channel",
            );
          else {
            channel = _channel;
            await waitingEmbed(
              "Winner Count",
              "Please send the giveaway winner count.",
            );
          }

          break;
        }

        case !winnerCount: {
          if (!(_w = parseInt(m.content)))
            return await failed(
              "The number of winners must be an integer.",

              "Winner Count",
              "Please send the giveaway winner count.",
            );
          if (_w < 1)
            return await failed(
              "Winner count must be more than 1.",
              "Winner Count",
              "Please send the giveaway winner count.",
            );
          else if (_w > 15)
            return await failed(
              "Winner count must be less than 15.",
              "Winner Count",
              "Please send the giveaway winner count.",
            );
          else {
            winnerCount = _w;
            await waitingEmbed("Duration", "Please send the giveaway duration");
          }

          break;
        }

        case !duration: {
          if (!(_d = parsec(m.content).duration))
            return await failed(
              "Please provide a valid duration.",
              "Duration",
              "Please send the giveaway duration",
            );
          if (_d > parsec("21d").duration)
            return await failed(
              "Duration must be less than 21 days!",
              "Duration",
              "Please send the giveaway duration",
            );
          else {
            duration = _d;
          }

          return client.giveawaysManager.start(channel, {
            prize,
            duration,
            winnerCount,
            messages,
            hostedBy: message.author,
          });
        }
      }
    });
    collector.on("end", (collected, reason) => {
      if (reason == "time") {
        message.reply({ embeds: [xembed] });
      }
    });
  },
};
