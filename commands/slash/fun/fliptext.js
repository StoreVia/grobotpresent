const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionFlipText extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('fliptext')
				.setDescription('Flip Text UpsideDown.')
			    .addStringOption(option =>
                    option.setName('text')
                        .setDescription('Enter Text You Want To Flip.')
                        .setRequired(true)),
			usage: 'fliptext',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
		
		await interaction.deferReply();
        await interaction.followUp({ content: `${await client.functions.filpText(await client.functions.getOptions(interaction).string(`text`))}`});
	}
};