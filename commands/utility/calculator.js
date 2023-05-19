const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const simplydjs = require("../../B_Gro_Modules/simply-djs");

module.exports = class Translate extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('calculator')
				.setDescription('Advanced Calculator With Buttons.'),
			usage: 'calculator',
			category: 'utility',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        simplydjs.calculator(interaction)

	}
};