const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionRockPaperScissors extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('rockpaperscissors')
				.setDescription('Play Rps Game.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`With Which User You Want To Play.`)
                        .setRequired(true)),
			usage: 'rockpaperscissors',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

    	let opponent = await client.functions.getOptions(interaction).user('user');
    	await client.functions.games(interaction, true).rockPaperScissors(opponent);
	}
};