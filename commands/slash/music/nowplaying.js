const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

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
        const track = queue.currentTrack;
        const part = Math.floor((queue.currentTime / track.duration) * 30);

        if(!queue){
            await interaction.deferReply({ ephemeral: true })
            interaction.followUp({ content: `> There Is Nothing In Queue Now.` })
        } else if(queue){
            await interaction.deferReply()
            const embed = new EmbedBuilder()
                .setAuthor({ 
                    name: track.playing ? 'Song Pause...' : 'Now Playing...', 
                    iconURL: process.env.music_iconurl
                })
                .setColor(`${process.env.ec}`)
                .setThumbnail(`${track.thumbnail}`)
                .setDescription(`**[${track.title}](${track.url})**`)
                .addFields(
                    { name: `Author: `, value: `> ${track.author}`, inline: true },
                    { name: `RequestedBy: `, value: `> ${queue.user}`, inline: true },
                    { name: `Volume: `, value: `> ${queue.volume}%`, inline: true },
                    { name: `Views: `, value: `> ${track.views}`, inline: true },
                    // { name: `Likes: `, value: `> ${track.likes}`, inline: true },
                    // { name: `Filters: `, value: `> ${queue.filters.names.join(', ') || 'None'}`, inline: true },
                    // { name: `Live: `, value: `> ${track.is_live ? "\`✔️\`" : "\`❌\`"}`, inline: true },
                    // { name: `AgeRestricted: `, value: `> ${track.age_restricted ? "\`✔️\`" : "\`❌\`"}`, inline: true },
                    // { name: `CurrentDuration: `, value: `> \`[${queue.formattedCurrentTime} / ${track.formattedDuration}]\``, inline: true },
                    // { name: `ProgressBar: `, value: `\`\`\`♪ ${'━'.repeat(part) + '🔵' + '━'.repeat(30 - part)}\`\`\``, inline: true }
                )
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`, 
                    iconURL: process.env.iconurl
                })
            interaction.followUp({ embeds: [embed] })
        }
	}
};