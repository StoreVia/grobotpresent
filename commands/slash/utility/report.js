const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Report extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('report')
				.setDescription('Report Any Bug Or Suggest Something For Bot Implimentation.')
                .addStringOption(option => 
                    option.setName(`bug`)
                        .setDescription(`Tell Us About The Bug/Any Suggestion.`)
                        .setRequired(true)),
			usage: 'report',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

        await interaction.deferReply({ ephemeral: true })
		let report = await client.functions.getOptions(interaction).string(`bug`);
        let repostFunction = await client.functions.report(interaction, report)

        return await interaction.followUp({ embeds: [repostFunction.embed] })
	}
};