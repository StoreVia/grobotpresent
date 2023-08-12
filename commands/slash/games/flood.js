const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionFlood extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('flood')
				.setDescription('Play Flood Game.')
				.addStringOption(option =>
					option.setName(`difficulty`)
						.setDescription(`Set Difficulty For Game.`)
						.setRequired(true)
						.addChoices(
							{ name: `Easy`, value: `8` },
							{ name: `Normal`, value: `13` },
							{ name: `Hard`, value: `18` },
						)),
			usage: 'flood',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		let difficulty = await client.functions.getOptions(interaction).string(`difficulty`);
		await client.functions.games(interaction, true).flood(difficulty);
	}
};