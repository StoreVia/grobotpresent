const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require("discord-player");

module.exports = class Lyrics extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('lyrics')
				.setDescription('Get Lyrics Of Currently Playing Song.'),
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
            	return await interaction.followUp({ embeds: [await client.functions.lyrics(interaction)]});
			} catch(e){
				return await interaction.followUp({ embeds: [await client.functions.embedBuild().description(`Lyrics Not Found. If You Think This A Bug Report By Using "/report" Command.`).build()]});
			}
        }
	}
};