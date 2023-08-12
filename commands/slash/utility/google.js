const Command = require('../../../structures/Commands/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Google extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('google')
				.setDescription('Search Something In Google.')
				.addStringOption(option =>
					option.setName(`query`)
						.setDescription(`Enter Text That You Want To Search In Google.`)
						.setRequired(true)),
			usage: 'google',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
		

		const query = interaction.options.getString(`query`);

        const embed = new EmbedBuilder()
        	.setTitle(`${query}`)
        	.setThumbnail(`https://cdn.discordapp.com/attachments/1103298159700103178/1121099172062429256/download.png`)
        	.setDescription(`**Searched for: **\n${query} \n\n**Result: **\n[Here's What I found](https://google.com/search?q=${query})`)
        	.setColor(`${process.env.ec}`)
        	.setFooter({
            	text: `${client.user.username} - ${process.env.year} ©`, 
            	iconURL: process.env.iconurl
        	});

    	await interaction.deferReply({ ephemeral: true })
    	interaction.followUp({ embeds: [embed] })
	}
};