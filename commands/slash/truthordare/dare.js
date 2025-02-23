const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, ButtonStyle } = require('discord.js');

module.exports = class Dare extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('dare')
				.setDescription('Get A Random Dare.')
				.setDMPermission(true),
			usage: 'dare',
			category: 'truthordare',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
		
		await interaction.deferReply();
		let buttonRow = await client.functions.buttons(`Dare`, `dare`, ButtonStyle.Secondary, `Stop`, `drstop`, ButtonStyle.Danger);

		let message = await interaction.followUp({ embeds: [await client.functions.generateDare()], components: [buttonRow] });
		return await client.functions.collector(message).dare(buttonRow, interaction.user.id);
	}
};