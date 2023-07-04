const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessagePing extends Command {
	constructor(client) {
		super(client, {
			name: "ping",
  			category: "Info",
  			alias: ["stats"],
  			cooldown: 3,
  			usage: `${process.env.prefix}ping`,
  			description: "Gives You Bots Ping.",
		});
	}

	async run(client, message) {
		message.reply({ embeds: [embed("-", "-")] }).then((msg) =>  msg.edit({ embeds: [embed(Math.floor(client.ws.ping), msg.createdTimestamp - message.createdTimestamp)] }));
	
		function embed(api, latency){
			let embed = new EmbedBuilder()
				.setColor(`${process.env.ec}`)
				.addFields(
					{ name: '**🟢 Api: **', value: `> \`${api} ms\``,inline: true },  
					{ name: '**🏓 Latency: **', value: `> \`${latency} ms\``, inline: true },
				)
			return embed;
		}

	}
};