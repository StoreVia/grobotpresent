const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionGif extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('gif')
				.setDescription('Search For A Gif.')
				.setDMPermission(true)
                .addStringOption(option =>
                    option.setName('string')
                        .setDescription(`Enter Text.`)
                        .setRequired(true)),
			usage: 'gif',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

    	await interaction.deferReply();
    	return interaction.followUp({ embeds: [await client.functions.gif(await client.functions.getOptions(interaction).string(`string`))]});
	}
};