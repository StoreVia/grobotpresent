const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Updates extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('updates')
				.setDescription('Get Latest Update Note.')
				.setDMPermission(true),
			usage: 'updates',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
		interaction.followUp({ embeds: [await client.functions.updates(interaction)] })
	}
};