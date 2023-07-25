const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder, ButtonStyle } = require('discord.js');

module.exports = class InteractionDice extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('dice')
				.setDescription('Roll Dice.')
				.setDMPermission(true),
			usage: 'dice',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		let buttonRow = await client.functions.buttons(`Roll Again`, `dice`, ButtonStyle.Secondary, `Stop`, `distop`, ButtonStyle.Danger);
		let randomNum = await client.functions.randomNum(6).natural();
		let embed = await client.functions.embedBuild().description(`🎲 You Got \`${randomNum}\``).build();

		await interaction.deferReply();
		let msg = await interaction.followUp({ embeds: [embed], components:  [buttonRow]});
		client.functions.collector(msg).dice(interaction.user.id, embed, buttonRow);
	}
};