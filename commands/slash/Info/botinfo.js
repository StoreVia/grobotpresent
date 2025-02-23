const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Botinfo extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('botinfo')
				.setDescription('Gives You Botinfo.')
				.setDMPermission(true),
			usage: 'botinfo',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
		let firstEmbed = await client.functions.botInfo("-", "-");

		return await interaction.followUp({ embeds: [firstEmbed.embed], components: [firstEmbed.buttonRow] }).then(async(msg) => {
			let secoundEmbed = await client.functions.botInfo(Math.floor(client.ws.ping), msg.createdTimestamp - interaction.createdTimestamp);
			msg.edit({ embeds: [secoundEmbed.embed] });
		})
	}
};