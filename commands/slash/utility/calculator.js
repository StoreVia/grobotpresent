const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Google extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('calculator')
				.setDescription('Use Calculator.'),
			usage: 'calculator',
			category: 'Utility',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		
		client.functions.calculator().inteaction();
	}
};