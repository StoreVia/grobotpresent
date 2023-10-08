const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageAutoMemeSet extends Command {
	constructor(client){
		super(client, {
			name: "automemeset",
  			category: "moderation",
  			alias: ["amemeset", "automset", "automs", "ams"],
  			cooldown: 5,
  			usage: `${process.env.prefix}automemeset <channelMention>`,
  			description: "Set Automeme Channel(beta).",
		});
	}
	async run(client, message){

		let channel = message.mentions.channels.first();
		const automemedb = client.db.table(`automeme`);
        const checkchannel = await automemedb.get(`${message.guild.id}`)
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
			if(!channel){
				return await msgdefer.edit({ content: `> Mention A Channel To Set Automeme.`})
			} else if(!checkchannel){
                await automemedb.set(`${message.guild.id}`, channel.id);
                return await msgdefer.edit({ content: `> Automeme Was Now Bounded To ${channel}.`})
            } else if(channel.id === checkchannel){
                return await msgdefer.edit({ content: `> Automeme Was Already Linked To ${channel}.`})
            } else if(channel.id != checkchannel){
                await automemedb.set(`${message.guild.id}`, channel.id);
                return await msgdefer.edit({ content: `> Automeme Was Now Updated To ${channel}.`})
            }
		}
	}
};