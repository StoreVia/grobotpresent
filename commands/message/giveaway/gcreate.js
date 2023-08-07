const Command = require('../../../structures/MessageCommandClass');
const { ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = class MessageGiveawayCreate extends Command {
	constructor(client){
		super(client, {
			name: "gcreate",
  			category: "giveaway",
  			alias: ["gc", "giveawaycreate"],
  			cooldown: 3,
  			usage: `${process.env.prefix}gcreate`,
  			description: "Create A Giveaway.",
		});
	}
	async run(client, message){

        /** let channel = null;
        let prize = null;
        let duration = null;
        let winnercount = null;
        let hosted = null; */
        let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else {
    		let prize, channel, winnerCount, duration, cancelled;
			const filter = (m) => m.author.id === message.author.id
			const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });
			let cancelEmbed = await client.functions.embedBuild().description(`Timeout! You Can't Respond To This Command. Please Use This Command Again.`).build();
			async function waitingEmbed(title, description){
				let embed = await client.functions.embedBuild().description(`${description} In Next 60 Seconds.`).build();
				await msgdefer.edit({ content: ``, embeds: [embed] })
			}
			await waitingEmbed(msgdefer, "Send Giveaway Prize Message.");
			
			collector.on("collect", async (m) => {
				if(cancelled === true)return;
				async function failed(options, ...cancel) {
					if(typeof cancel[0] === "boolean"){
					  (cancelled = true) && (await msgdefer.edit({ content: `${options}` }));
					} else {
					  await msgdefer.edit({content: `${options}`});
					  return await waitingEmbed(...cancel);
					}
				}
      			if (m.content === "cancel") {
        			collector.stop();
        			cancelled = true;
        			return await msgdefer.edit({ content: ``, embeds: [await client.functions.embedBuild().description(`Giveaway Creation Cancelled.`).build()]});
      			}
				switch(true){
					case !prize:{
						if(m.content.length > 256){
							return await failed("The prize can not be more than 256 characters.", "Prize", "Please send the giveaway prize",);
						} else {
							prize = m.content;
							await waitingEmbed("Channel", "Please send the giveaway channel");
					  	}
						break;
					}
					case !channel:{
						if(!(_channel = m.mentions.channels.first() || m.guild.channels.cache.get(m.content))){
							return await failed("Please send a valid channel / channel ID.", "Channel", "Please send the giveaway channel",);
						} else if(!_channel.isText()){
							return await failed("The channel must be a text channel.", "Channel", "Please send the giveaway channel");
						} else {
							channel = _channel;
							await waitingEmbed("Winner Count", "Please send the giveaway winner count.");
					  	}
						break;
					}
					case !winnerCount:{
						if(!(_w = parseInt(m.content))){
							return await failed("The number of winners must be an integer.", "Winner Count", "Please send the giveaway winner count.");
						} else if (_w < 1){
							return await failed("Winner count must be more than 1.", "Winner Count", "Please send the giveaway winner count.");
						} else if (_w > 15){
							return await failed("Winner count must be less than 15.", "Winner Count", "Please send the giveaway winner count.");
						} else {
							winnerCount = _w;
							await waitingEmbed("Duration", "Please send the giveaway duration");
					 	}
					  	break;
					}
					case !duration:{
						if(!(_d = parsec(m.content).duration)){
							return await failed("Please provide a valid duration.", "Duration", "Please send the giveaway duration");
						} else if (_d > parsec("21d").duration){
							return await failed("Duration must be less than 21 days!", "Duration", "Please send the giveaway duration");
						} else {
							duration = _d;
					  	}
					  	return client.giveawaysManager.start(channel, {
							prize,
							duration,
							winnerCount,
							messages,
							hostedBy: message.author,
					  	});
					}
				}
			})
			collector.on("end", (collected, reason) => {
				if(reason == "time"){
					msgdefer.edit({ content: ``, embeds: [cancelEmbed] });
				}
			});
		}
	}
};