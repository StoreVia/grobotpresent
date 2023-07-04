const Command = require('../../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Flood } = require('../../../B_Gro_Modules/discord-gamecord')

module.exports = class FloodGame extends Command {
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

		let difficulty = interaction.options.getString(`difficulty`);

        const Game = new Flood({
            message : interaction,
            isSlashGame: true,
            embed: {
              title: 'Flood',
			  difficulty: difficulty,
              color: `${process.env.ec}`,
            },
        })
		Game.startGame();
	}
};