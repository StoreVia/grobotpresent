const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const { Slots } = require('../../../B_Gro_Modules/discord-gamecord')

module.exports = class InteractionSlots extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('slots')
				.setDescription('Play Slots Game.'),
			usage: 'slots',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
        new Slots({
            message : interaction,
            isSlashGame: true,
            embed: {
              title: 'Slots',
              color: `${process.env.ec}`,
            },
        }).startGame();
	}
};