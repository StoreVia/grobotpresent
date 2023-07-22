const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Dice extends Command {
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

		let buttonRow = await client.functions.buttons().two(`Roll Again`, `dice`, `Stop`, `distop`);
		let randomNum = await client.functions.randomNum(6).natural();
		let embed = await client.functions.embed().onlyDescription(`🎲 You Got \`${randomNum}\``);

		await interaction.deferReply();
		let msg = await interaction.followUp({ embeds: [embed], components:  [buttonRow]});
		client.functions.collector(msg).dice(interaction.user.id, embed, buttonRow);
	}
};