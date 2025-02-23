const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionHangMan extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('hangman')
				.setDescription('Play Hangman Game.'),
			usage: 'hangman',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
        
		await client.functions.games(interaction, true).hangMan(true);
	}
};