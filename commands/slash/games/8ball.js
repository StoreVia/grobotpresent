const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionEightBall extends Command {
	constructor(client){
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
	async run(client, interaction){

    	await interaction.deferReply();
    	const question = await client.functions.getOptions(interaction).string('question');
    
		await interaction.followUp({ embeds: [await client.functions.embedBuild().title(`8Ball`).ibfields(`Your Question`, `${question}`, `Answer`, `${await client.functions.eightBall()}`).build()]});
	}
};