const Command = require('../../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class EightBallGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('8ball')
				.setDescription('Play 8Ball Game.')
        .addStringOption(option =>
          option.setName('question')
                .setDescription('Enter Question.')
                .setRequired(true)),
			usage: '8ball',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    await interaction.deferReply();
    const question = interaction.options.getString('question');
    let functions = client.functions;
    
		await interaction.followUp({ embeds: [await functions.embedBuild().title(`8Ball`).ibfields(`Your Question`, `${question}`, `Answer`, `${await functions.eightBall()}`).build()]});
	}
};