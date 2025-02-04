const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Join extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('join')
				.setDescription('Make Bot To Join In Voice Channel.'),
			usage: 'join',
			category: 'music',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
		
		const clientVoice = interaction.guild.members.me.voice.channel;
        const memberVoice = await client.functions.voiceChannel().interaction(interaction);

		if(clientVoice){
			if(clientVoice != memberVoice){
				await interaction.deferReply({ ephemeral: true });
				interaction.followUp({ content: `> I Was Already In A Voice Channel, Join Now: ${clientVoice}.` })
			} else if(clientVoice === memberVoice){
                await interaction.deferReply({ ephemeral: true });
				interaction.followUp({ content: `> I Was Already In Your Voice Channel.` })
            }
		} else if(!memberVoice){
            await interaction.deferReply({ ephemeral: true });
			interaction.followUp({ content: `> Please Join A Voice Channel.` })
        } else if(!clientVoice){
			await client.functions.joinVc(memberVoice);
			await interaction.deferReply({ ephemeral: true });
			interaction.followUp({ content: `> Joined.` })   
        }
	}
};