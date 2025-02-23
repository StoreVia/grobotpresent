const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionWordle extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('wordle')
				.setDescription('Play Wordle Game.'),
			usage: 'wordle',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

        await client.functions.games(interaction, true).wordle();
	}
};