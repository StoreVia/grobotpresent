const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const { Trivia } = require('../../../B_Gro_Modules/discord-gamecord')

module.exports = class InteractionTrivia extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('trivia')
				.setDescription('Play Trivia Game.'),
			usage: 'snake',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        new Trivia({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Trivia',
              color: `${process.env.ec}`,
            },
          }).startGame();
	}
};