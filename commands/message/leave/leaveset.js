const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageLeaveSet extends Command {
	constructor(client){
		super(client, {
			name: "leaveset",
  			category: "leave",
  			alias: ["lveset", "lset", "ls"],
  			cooldown: 5,
  			usage: `${process.env.prefix}leaveset <channelMention>`,
  			description: "Set Leave Channel.",
		});
	}
	async run(client, message){

        let channel = message.mentions.channels.first();
		const leavedb = client.db.table(`leave`);
        const checkchannel = await leavedb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
			if(!channel){
				return await msgdefer.edit({ content: `> Mention A Channel To Set A Leave Channel.`})
			} else if(!checkchannel){
                await leavedb.set(`${message.guild.id}`, channel.id);
                return await msgdefer.edit({ content: `> Leave System Was Now Bounded To ${channel}.`})
            } else if(channel.id === checkchannel){
                return await msgdefer.edit({ content: `> Leave System Was Already Linked To ${channel}.`})
            } else if(channel.id != checkchannel){
                await leavedb.set(`${message.guild.id}`, channel.id);
                return await msgdefer.edit({ content: `> Leave System Was Now Updated To ${channel}.`})
            }
		}
	}
};