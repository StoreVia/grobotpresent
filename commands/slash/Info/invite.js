const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Invite extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('invite')
				.setDescription('Gives You Invite Link Of Bot.')
				.setDMPermission(true),
			usage: 'invite',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
		return await interaction.followUp({ embeds: [await client.functions.invite()] });
	}
};