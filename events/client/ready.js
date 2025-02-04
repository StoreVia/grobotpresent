const Event = require('../../structures/Events/EventClass');
const colors = require(`colors`)
const { SpotifyExtractor, SoundCloudExtractor, AppleMusicExtractor } = require('@discord-player/extractor');
const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');
const titlecase = require(`titlecase`);   

module.exports = class ReadyEvent extends Event {
	constructor(client){
		super(client, {
			name: 'ready',
			once: true,
		});
	}
	async run(){
		
		const client = this.client;

		setInterval(()=>{
			client.guilds.cache.forEach(async(x) => {
				let automemedb = client.db.table(`automeme`)
				let channel = await automemedb.get(`${x.id}`)
				let sub = [
					'meme',
					'me_irl',
					'memes',
					'dankmeme',
					'dankmemes',
					'ComedyCemetery',
					'terriblefacebookmemes',
					'funny'
				]
				const random = Math.floor(Math.random() * sub.length)
				if(!channel){
					return
				} else if(channel){
					fetch(`https://www.reddit.com/r/${sub[random]}/random/.json`)
					.then((res) => res.json())
					.then(async(response) => {
					if(!response){
						return;
					} else if(!response[0].data){
						return;
					} else if(response[0].data.children[0].data.over_18 === true){
						return;
					} else {
						let perma = response[0].data.children[0].data.permalink;
						let url = `https://reddit.com${perma}`;
						let memeImage = response[0].data.children[0].data.url || response[0].data.children[0].data.url_overridden_by_dest;
						let title = response[0].data.children[0].data.title;
						const embed = new EmbedBuilder()
							.setTitle(`${titlecase(title)}`)
							.setURL(`${url}`)
							.setImage(memeImage)
							.setColor(`${process.env.ec}`)
							.setFooter({
								text: `${client.user.username} - ${process.env.year} ©`, 
								iconURL: process.env.iconurl
							});
							client.channels.cache.get(`${channel}`).send({ embeds: [embed] });
						}
					});
				}
			});
		}, 3600000);
		
		await client.player.extractors.register(SpotifyExtractor);
		await client.player.extractors.register(SoundCloudExtractor);
		await client.player.extractors.register(AppleMusicExtractor);
	
		console.log(colors.red(`Discord Bot Is Now Online With ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Users And ${client.guilds.cache.size} Servers.`));
	}
};