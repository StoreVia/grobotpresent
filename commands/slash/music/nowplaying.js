const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require("parse-ms-2");

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
        
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

        if(!queue){
            await interaction.deferReply({ ephemeral: true })
            interaction.followUp({ content: `> There Is Nothing In Queue Now.` })
        } else if(queue){
            await interaction.deferReply()
            const embed = new EmbedBuilder()
                .setAuthor({ 
                    name: queue.songs[0].playing ? 'Song Pause...' : 'Now Playing...', 
                    iconURL: process.env.music_iconurl
                })
                .setColor(`${process.env.ec}`)
                .setThumbnail(`${queue.songs[0].thumbnail}`)
                .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
                .addFields(
                    { name: `Author: `, value: `> [${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, inline: true },
                    { name: `RequestedBy: `, value: `> ${queue.songs[0].user}`, inline: true },
                    { name: `Volume: `, value: `> ${queue.volume}%`, inline: true },
                    { name: `Views: `, value: `> ${queue.songs[0].views.toLocaleString()}`, inline: true },
                    { name: `Likes: `, value: `> ${queue.songs[0].likes.toLocaleString()}`, inline: true },
                    { name: `Filters: `, value: `> ${queue.filters.names.join(', ') || 'None'}`, inline: true },
                    { name: `Live: `, value: `> ${queue.songs[0].is_live ? "\`✔️\`" : "\`❌\`"}`, inline: true },
                    { name: `AgeRestricted: `, value: `> ${queue.songs[0].age_restricted ? "\`✔️\`" : "\`❌\`"}`, inline: true },
                    { name: `CurrentDuration: `, value: `> \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, inline: true },
                    { name: `ProgressBar: `, value: `\`\`\`♪ ${'━'.repeat(part) + '🔵' + '━'.repeat(30 - part)}\`\`\``, inline: true }
                )
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`, 
                    iconURL: process.env.iconurl
                })
            interaction.followUp({ embeds: [embed] })
        }
	}
};