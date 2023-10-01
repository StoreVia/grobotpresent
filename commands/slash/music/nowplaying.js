const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useTimeline, useQueue } = require("discord-player");

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
        const { timestamp, volume, paused, pause, resume, setVolume, setPosition, track } = useTimeline(interaction.guild.id);
        const part = Math.floor((timestamp.current.value / timestamp.total.value) * 30);
        
        if(!queue){
            await interaction.deferReply({ ephemeral: true })
            interaction.followUp({ content: `> There Is Nothing In Queue Now.` })
        } else if(queue){
            await interaction.deferReply()
            const embed = await client.functions.embedBuild().author(track.playing ? 'Song Pause...' : 'Now Playing...', `${process.env.music_iconurl}`).description(`**[${track.title}](${track.url})**`).thumbnail(`${track.thumbnail}`).bfields(`Author`, `> ${track.author}`, true, `Volume`, `> ${queue.node.volume}%`, true, `Live`, `> ${track.is_live ? "\`✔️\`" : "\`❌\`"}`, true,  `CurrentDuration`, `> \`[${timestamp.current.label} / ${timestamp.total.label}]\``, true,  `Filters`, `> ${queue.filter || 'None'}`, true,  `ProgressBar`, `\`\`\`♪ ${'━'.repeat(part) + '🔵' + '━'.repeat(30 - part)}\`\`\``, false).footer().build();
            interaction.followUp({ embeds: [embed] })
        }
	}
};