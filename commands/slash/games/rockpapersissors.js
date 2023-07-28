const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionRockPaperScissors extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('rockpapersissors')
				.setDescription('Play Rps Game.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`With Which User You Want To Play.`)
                        .setRequired(true)),
			usage: 'rockpapersissors',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    	const opponent = interaction.options.getUser('user');
    	await client.functions.games(interaction).rockPaperScissors(true, opponent);
	}
};