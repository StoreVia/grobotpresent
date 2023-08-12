const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionTicTacToe extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('tictactoe')
				.setDescription('Play TicTacToe Game.')
        .addUserOption(option =>
          option.setName('user')
              .setDescription(`With Which User You Want To Play.`)
              .setRequired(true)),
			usage: 'tictactoe',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

    const opponent = interaction.options.getUser('user');
    await client.functions.games(interaction, true).tictactoe(opponent)
	}
};