const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, ButtonStyle } = require('discord.js');

module.exports = class Truth extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('truth')
				.setDescription('Get A Random Truth.')
				.setDMPermission(true),
			usage: 'truth',
			category: 'truthordare',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
		let buttonRow = await client.functions.buttons(`Truth`, `truth`, ButtonStyle.Secondary, `Stop`, `trstop`, ButtonStyle.Danger);

		let message = await interaction.followUp({ embeds: [await client.functions.generateTruth()], components: [buttonRow] });
		return await client.functions.collector(message).truth(buttonRow, interaction.user.id);
	}
};