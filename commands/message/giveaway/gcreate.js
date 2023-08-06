const Command = require('../../../structures/MessageCommandClass');
const { ButtonStyle } = require('discord.js');

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
			let cancelled = false;
    		let prize, channel, winnerCount, duration;
			const filter = (m) => m.author.id === message.author.id
			const collector = msgdefer.createMessageComponentCollector({ filter, time: 60000 });
			let cancelEmbed = await client.functions.embedBuild().description(`Timeout! You Can't Respond To This Command. Please Use This Command Again.`).build();
		}
		async function waitingEmbed(msg, description){
			let embed = await client.functions.embedBuild().description(description).build();
			await msg.edit({ embeds: [embed] })
		}
	}
};