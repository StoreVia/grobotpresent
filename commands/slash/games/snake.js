const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const { Snake } = require('../../../B_Gro_Modules/discord-gamecord')

module.exports = class InteractionSnake extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('snake')
				.setDescription('Play Snake Game.'),
			usage: 'snake',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

    await client.functions.games(interaction, true).snake();
  }    
};