const PlayerEvent = require('../../structures/Events/PlayerEventClass');
const Discord = require(`discord.js`);

module.exports = class PlayerStart extends PlayerEvent {
	constructor(client){
		super(client, {
			name: 'playerStart',
			category: 'player',
		});
	}
	async run(queue, track){

		const client = this.client;
        
        let embed = new Discord.EmbedBuilder()
            .setAuthor({
                name: `Now Playing ♪`,
                iconURL: process.env.music_iconurl
            })
            .setThumbnail(`${track.thumbnail}`)
            .setDescription(`[${track.title}](${track.url})`)
            .addFields(
                { name: '**Author: **', value: `${track.author}`,inline: true },
                { name: `\u200b`, value: `\u200b`, inline: true },
                { name: '**Duration: **', value: `\`${track.duration}\``,inline: true },
            )
            .setColor(`${process.env.ec}`)
            .setFooter({
                text: `${client.user.username} - ${process.env.year} ©`,
                iconURL: process.env.iconurl
            })
        queue.metadata.channel.send({ embeds: [embed] });        
	}
};