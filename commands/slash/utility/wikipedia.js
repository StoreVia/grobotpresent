const Command = require('../../../structures/Commands/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Wikipedia extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('wikipedia')
				.setDescription('Search Something In Wikipedia.')
				.addStringOption(option =>
					option.setName(`query`)
						.setDescription(`Enter Text That You Want To Search In Wikipedia.`)
						.setRequired(true)),
			usage: 'wikipedia',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
		const query = await client.functions.getOptions(interaction).string(`query`);
		let embed = await client.functions.wikipedia(query);

		await interaction.followUp({ embeds: [embed.embedUpdate] });
	}
};