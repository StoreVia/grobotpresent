const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Play extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('play')
				.setDescription('Play Music In Voice Channel.')
				.addStringOption(option =>
					option.setName(`search`)
						.setDescription(`Enter Song Name.`)
						.setRequired(true)),
			usage: 'play',
			category: 'music',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){   

        const query = await client.functions.getOptions(interaction).string(`search`);
		const clientVoice = interaction.guild.members.me.voice.channel;
        const memberVoice = await client.functions.voiceChannel().interaction(interaction);

		if(clientVoice){
			if(clientVoice != memberVoice){
				await interaction.deferReply({ ephemeral: true });
				interaction.followUp({ content: `> I Was Already In A Voice Channel, Join Now: ${clientVoice}.` })
			} else if(clientVoice === memberVoice){
				await interaction.deferReply();
				interaction.followUp({ content: `🔍Searching...` })
				await client.functions.play(memberVoice, query, interaction);
			}
		} else if(!memberVoice){
			await interaction.deferReply({ ephemeral: true });
			interaction.followUp({ content: `> Please Join A Voice Channel.` })
		} else if(memberVoice){
			await interaction.deferReply();
			interaction.followUp({ content: `🔍Searching...` })
			await client.functions.play(memberVoice, query, interaction);
		}
	}
};