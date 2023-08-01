const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionTrivia extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('trivia')
				.setDescription('Play Trivia Game.'),
			usage: 'snake',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

        await client.functions.games(interaction, true).trivia();
	}
};