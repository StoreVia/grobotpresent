const Event = require('../../structures/EventClass');
const colors = require(`colors`)
const { ActivityType } = require('discord.js');
const { SpotifyExtractor, SoundCloudExtractor, AppleMusicExtractor, YouTubeExtractor } = require('@discord-player/extractor');
const fetch = require('node-fetch');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const titlecase = require(`titlecase`);

module.exports = class ReadyEvent extends Event {
	constructor(client) {
		super(client, {
			name: 'ready',
			once: true,
		});
	}
	async run() {
		
		const client = this.client;
		let status = [
			"/help | grobot.store",
		]
		client.user.setPresence({
			activities: [{ name: `${status[Math.floor(Math.random() * status.length)]}`, type: ActivityType.Playing }]
		});

		setInterval(()=>{
			let status = [
				"/help | grobot.store",
			]
			client.user.setPresence({
				activities: [{ name: `${status[Math.floor(Math.random() * status.length)]}`, type: ActivityType.Playing }]
			});
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
				} else if(channel) {
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
		await client.player.extractors.register(YouTubeExtractor);

		await client.db.table(`premiumactivated`).set(`1`, {keyandtime: `123, ${Date.now()}`})
		await client.db.table(`updates`).set(`1`, `123`)
		await client.db.table(`ticket`).set(`1`, {details:{channel: `123`, category: `123`, ticketLogs: `123`, supportRole: `123`}})
		await client.db.table(`ticketembed`).set(`1`,{title: `123`, description: `123`, thumbnail: `123`})
		await client.db.table(`ticketblock`).set(`1`, [`123`])
		await client.db.table(`chatbot`).set(`1`, `123`)
		await client.db.table(`chatbotdisable`).set(`1`, `123`)
	
		console.log(colors.red(`Discord Bot Is Now Online With ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Users And ${client.guilds.cache.size} Servers.`));
	}
};