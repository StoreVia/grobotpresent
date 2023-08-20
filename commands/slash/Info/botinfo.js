const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const version = require(`../../../package.json`).version;

module.exports = class Botinfo extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('botinfo')
				.setDescription('Gives You Botinfo.')
				.setDMPermission(true),
			usage: 'botinfo',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
		return await interaction.followUp({ embeds: [client.functions.botInfo("-", "-")] }).then((msg) =>  msg.edit({ embeds: [client.functions.botInfo(Math.floor(client.ws.ping), msg.createdTimestamp - interaction.createdTimestamp)] }));
	}
};