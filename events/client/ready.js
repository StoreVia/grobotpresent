const Event = require('../../structures/EventClass');
const colors = require(`colors`)
const { ActivityType } = require('discord.js');
const db = require(`quick.db`);
const { SpotifyExtractor, SoundCloudExtractor } = require('@discord-player/extractor');

module.exports = class ReadyEvent extends Event {
	constructor(client) {
		super(client, {
			name: 'ready',
			once: true,
		});
	}
	async run() {
		
		const client = this.client;

		setInterval(()=>{
			let status = [
				"/help | grobot.store",
			]
			client.user.setPresence({
				activities: [{ name: `${status[Math.floor(Math.random() * status.length)]}`, type: ActivityType.Playing }]
			});
		}, 15000);

		
		await client.player.extractors.register(SpotifyExtractor, {});
		console.log(colors.red(`Discord Bot Is Now Online With ${client.users.cache.size} Users And ${client.guilds.cache.size} Servers.`));
	}
};