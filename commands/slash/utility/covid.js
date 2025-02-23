const Command = require('../../../structures/Commands/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class Covid extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('covid')
				.setDescription('Get Covid-19 Stats Around The World.')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('all')
                        .setDescription('Get Covid Cases All Over The World.')),
			usage: 'covid',
			category: 'utility',
            premium: `true`,
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
        let embed = await client.functions.covid();

        if(interaction.options.getSubcommand() === 'all'){
            await interaction.followUp({ embeds: [embed.embedUpdate] });
        }
	}
};