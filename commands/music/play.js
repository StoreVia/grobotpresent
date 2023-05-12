const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const { DisTube, DisTubeError } = require('distube');

module.exports = class Play extends Command {
	constructor(client) {
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
	async run(client, interaction) {   

        const args = interaction.options.getString(`search`);
		const clientVoice = interaction.guild.members.me.voice.channel;
        const memberVoice = interaction.member.voice.channel;
		const distube = client.distube;

		if(clientVoice){
			if(clientVoice != memberVoice){
				await interaction.deferReply({ ephemeral: true });
				interaction.followUp({ content: `> I Was Already In A Voice Channel, Join Now: ${clientVoice}.` })
			} else if(clientVoice === memberVoice){
				await interaction.deferReply();
				interaction.followUp({ content: `🔍Searching...` })
				.then(() => {
					distube.play(interaction.member.voice.channel, args, {
						member: interaction.member,
						textChannel: interaction.channel,
						interaction
					})
				})
			}
		} else if(!memberVoice){
			await interaction.deferReply({ ephemeral: true });
			interaction.followUp({ content: `> Please Join A Voice Channel.` })
		} else if(memberVoice){
			await interaction.deferReply();
			interaction.followUp({ content: `🔍Searching...` })
			.then(() => {
				distube.play(interaction.member.voice.channel, args, {
					member: interaction.member,
					textChannel: interaction.channel,
					interaction
				})
			})
		}
	}
};