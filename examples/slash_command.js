const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Interaction extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('')
				.setDescription('.'),
			usage: '',
			category: '',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
        
		//your_code
	}
};