const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, ButtonStyle } = require('discord.js');

module.exports = class Fact extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('fact')
				.setDescription('Gives A Random Fact.(premium)')
				.setDMPermission(true),
			usage: 'fact',
			category: 'utility',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
		let buttonRow = await client.functions.buttons(`Next`, `fact`, ButtonStyle.Secondary, `Stop`, `stop`, ButtonStyle.Danger);
		let fact = await client.functions.randomFact();
		let embed = await client.functions.embedBuild().title(`Facts`).thumbnail(`${process.env.fact_thumbnail}`).description(`${fact}`).footer().build();

		let message = await interaction.followUp({ embeds: [embed], components: [buttonRow] });
		await client.functions.collector(message).fact(interaction.user.id, embed, buttonRow)
	}
};