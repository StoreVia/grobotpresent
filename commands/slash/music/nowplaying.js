const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require("discord-player");

module.exports = class NowPlaying extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('nowplaying')
				.setDescription('Get Details About Current Playing Song.'),
			usage: 'nowplaying',
			category: 'music',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		const queue = useQueue(interaction.guild.id);
        
        if(!queue){
            await interaction.deferReply({ ephemeral: true })
            interaction.followUp({ content: `> There Is Nothing In Queue Now.` })
        } else if(queue){
            await interaction.deferReply()
			try {
            	interaction.followUp({ embeds: [await client.functions.nowPlaying(interaction)]})
			} catch(e){
				let embed = await client.functions.embedBuild().description(`Any Songs Aren't Playing Right Now. Please Try Again Later.`).build();
				interaction.followUp({ embeds: [embed] });
			}
        }
	}
};