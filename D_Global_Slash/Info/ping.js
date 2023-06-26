const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('ping')
				.setDescription('Gives You Bots Ping.')
				.setDMPermission(true),
			usage: 'ping',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply()
		interaction.followUp({ embeds: [embed("-", "-")] }).then((msg) =>  msg.edit({ embeds: [embed(Math.floor(client.ws.ping), msg.createdTimestamp - interaction.createdTimestamp)] }));
	
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