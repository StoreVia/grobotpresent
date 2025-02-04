const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, ButtonStyle } = require('discord.js');
const titlecase = require(`titlecase`);

module.exports = class InteractionMeme extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('meme')
				.setDescription('Get A Random Meme.')
				.setDMPermission(true),
			usage: 'meme',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
		let buttonRow = await client.functions.buttons(`NextMeme`, `meme`, ButtonStyle.Secondary, `Stop`, `mestop`, ButtonStyle.Danger);
		let meme = await client.functions.generateMeme();
		let embed = await client.functions.embedBuild().title(`${titlecase(meme.title)}`).url(`${meme.url}`).image(meme.memeImage).footer().build();
		
		let message = await interaction.followUp({ embeds: [embed], components: [buttonRow] });
		await client.functions.collector(message).meme(interaction.user.id, embed, buttonRow);
	}
};