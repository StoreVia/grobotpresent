const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionNitro extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('nitro')
				.setDescription('Get Free Nitro Link.')
				.setDMPermission(true),
			usage: 'nitro',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();
    let msg = await interaction.followUp({embeds: [await client.functions.embedBuild().description(`Discord Nitro Payment Started!`).build()]});
    await client.functions.nitro(msg)
	}
};