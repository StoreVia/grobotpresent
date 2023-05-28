const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { pingEmbed } = require(`../../functions`);

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

		await interaction.deferReply();
		
		interaction.followUp({ embeds: [pingEmbed("-", "-")] }).then((msg) =>  msg.edit({ embeds: [pingEmbed(Math.floor(client.ws.ping), msg.createdTimestamp - interaction.createdTimestamp)] }));

	}
};