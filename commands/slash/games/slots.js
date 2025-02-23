const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionSlots extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('slots')
				.setDescription('Play Slots Game.'),
			usage: 'slots',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
		
		await client.functions.games(interaction, true).slots()
	}
};