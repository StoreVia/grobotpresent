const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionTwoZeroFourEight extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('2048')
				.setDescription('Play 2048 Game.'),
			usage: '2048',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await client.functions.games(interaction, true).twozerofoureight();
	}
};