const PlayerEvent = require('../../structures/PlayerEventClass');
const Discord = require(`discord.js`);

module.exports = class AudioTracksAdd extends PlayerEvent {
	constructor(client){
		super(client, {
			name: 'audioTracksAdd',
			category: 'player',
		});
	}
	async run(queue, track){

		const client = this.client;

        let embed = new Discord.EmbedBuilder()
            .setAuthor({
                name: `Added PlayList To Queue!`,
                iconURL: process.env.music_iconurl
            }) 
            .addFields(
                { name: '**No.OfSongs: **', value: `${queue.getSize()}`,inline: true },
            )
            .setColor(`${process.env.ec}`)
            .setFooter({
                text: `${client.user.username} - ${process.env.year} ©`,
                iconURL: process.env.iconurl
            })
        queue.metadata.channel.send({ embeds: [embed] });        
	}
};