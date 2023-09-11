const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class MemberCount extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('membercount')
				.setDescription('Gives You Server Member Count.')
				.setDMPermission(true),
			usage: 'membercount',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
		return await interaction.followUp({ embeds: [await client.functions.memberCount(interaction)] });
	}
};