const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');

module.exports = class TruthOrDare extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('truthordare')
				.setDescription('Get A Random Truth Or Dare.')
				.setDMPermission(true),
			usage: 'truthordare',
			category: 'truthordare',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
		
		await interaction.deferReply();
		let buttonRow = await client.functions.buttons(`Tod`, `tod`, ButtonStyle.Secondary, `Stop`, `todstop`, ButtonStyle.Danger);

		let message = await interaction.followUp({ embeds: [await client.functions.generateTruthOrDare()], components: [buttonRow] });
		return await client.functions.collector(message).truthordare(buttonRow, interaction.user.id);
	}
};