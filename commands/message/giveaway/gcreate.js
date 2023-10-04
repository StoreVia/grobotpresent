const Command = require('../../../structures/Commands/MessageCommandClass');
const parsec = require("parsec");

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

        let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else {
    		let prize, channel, winnerCount, duration, cancelled;
			const filter = m => m.author.id === message.author.id;
			let cancelEmbed = await client.functions.embedBuild().description(`Timeout! You Can't Respond To This Command. Please Use This Command Again.`).build();
			await waitingEmbed("Please Send Giveaway Prize");
			
			const collector = message.channel.createMessageCollector({ filter, time: 60000 });
			collector.on('collect', async m => {
				if(cancelled === true) return;
      			if(m.content === "cancel"){
        			collector.stop();
        			cancelled = true;
					await m.delete().catch(() => { return });
        			return await msgdefer.edit({ content: ``, embeds: [await client.functions.embedBuild().description(`Giveaway Creation Cancelled.`).build()]});
      			}
				switch(true){
					case !prize:{
						if(m.content.length > 256){
							await m.delete().catch(() => { return });
							return await failed("The Prize Should Be Below 256 Characters. Try Again.", "Prize", "Please Send Giveaway Prize.",);
						} else {
							prize = m.content;
							await waitingEmbed("Please Send Giveaway Channel");
							await m.delete().catch(() => { return });
					  	}
						break;
					}
					case !channel:{
						if(!(channel = m.mentions.channels.first() || m.guild.channels.cache.get(m.content))){
							await m.delete().catch(() => { return });
							return await failed("Please Mention A Channel. Try Again.", "Channel", "Please Send Giveaway Channel.",);
						} else if(!channel.isTextBased()){
							await m.delete().catch(() => { return });
							return await failed("Please Mention A Channel Which Is Text Based. Try Again.", "Channel", "Please Send Giveaway Channel.");
						} else {
							channel = channel;
							await waitingEmbed("Please Send Giveaway WinnerCount");
							await m.delete().catch(() => { return });
					  	}
						break;
					}
					case !winnerCount:{
						if(!(winnerCount = parseInt(m.content))){
							await m.delete().catch(() => { return });
							return await failed("The Number Of WinnerCount Must Be An Integer. Try Again.", "WinnerCount", "Please Send Giveaway WinnerCount.");
						} else if(winnerCount < 1){
							await m.delete().catch(() => { return });
							return await failed("WinnerCount Must Be More Than One Number. Try Again.", "WinnerCount", "Please Send Giveaway WinnerCount.");
						} else if(winnerCount > 1000){
							await m.delete().catch(() => { return });
							return await failed("WinnerCount Must Be Less Than 100. Try Again.", "WinnerCount", "Please Send Giveaway WinnerCount.");
						} else {
							winnerCount = winnerCount;
							await waitingEmbed("Please Send Giveaway Duration Eg: 10s, 10min, 10h, 10d");
							await m.delete().catch(() => { return });
					 	}
					  	break;
					}
					case !duration:{
						if(!(duration = parsec(m.content).duration)){
							await m.delete().catch(() => { return });
							return await failed("Please Provide Valid Duration As Mentioned In Embed. Try Again.", "Duration", "Please Send Giveaway Duration Eg: 10s, 10min, 10h, 10d.");
						} else if(duration > parsec("20d").duration){
							await m.delete().catch(() => { return });
							return await failed("Giveaway Duration Must To Less Than 20 Days. Try Again.", "Duration", "Please Send Giveaway Duration Eg: 10s, 10min, 10h, 10d.");
						} else {
							duration = duration;
							await m.delete().catch(() => { return });
							await msgdefer.edit({ content: ``, embeds: [await client.functions.embedBuild().description(`Giveaway Started In ${channel} Checkout!`).build()]});
					  	}
						await client.functions.giveaway().start(channel, prize, duration, winnerCount, message.author);
					}
				}
			})
			collector.on("end", (collected, reason) => {
				if(reason == "time"){
					msgdefer.edit({ content: ``, embeds: [cancelEmbed] });
				}
			});
		}
		
		async function waitingEmbed(description){
			let embed = await client.functions.embedBuild().description(`${description}, In Next 60 Seconds.`).build();
			await msgdefer.edit({ content: ``, embeds: [embed] })
		}
		async function failed(options, ...cancel){
			if(typeof cancel[0] === "boolean"){
			  (cancelled = true) && (await msgdefer.edit({ content: `${options}` }));
			} else {
			  await msgdefer.edit({content: `${options}`})
			}
		}
	}
};