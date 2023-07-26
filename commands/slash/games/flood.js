const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const { Flood } = require('../../../B_Gro_Modules/discord-gamecord')

module.exports = class InteractionFlood extends Command {
	constructor(client) {
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
	async run(client, interaction) {

		let difficulty = await client.functions.getOptions(interaction).string(`difficulty`);
		await client.functions.games(interaction).flood(true, difficulty);
	}
};