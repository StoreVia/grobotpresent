const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageWelcomeSet extends Command {
	constructor(client){
		super(client, {
			name: "welcomeset",
  			category: "welcome",
  			alias: ["wlcmest", "wset", "ws"],
  			cooldown: 5,
  			usage: `${process.env.prefix}welcomeset <channelMention>`,
  			description: "Set Welcome Channel.",
		});
	}
	async run(client, message){

        let channel = message.mentions.channels.first();
		const welcomedb = client.db.table(`welcome`);
        const checkchannel = await welcomedb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
			if(!channel){
				return await msgdefer.edit({ content: `> Mention A Channel To Set A Welcome Channel.`})
			} else if(!checkchannel){
                await welcomedb.set(`${message.guild.id}`, channel.id);
                return await msgdefer.edit({ content: `> Welcome System Was Now Bounded To ${channel}.`})
            } else if(channel.id === checkchannel){
                return await msgdefer.edit({ content: `> Welcome System Was Already Linked To ${channel}.`})
            } else if(channel.id != checkchannel){
                await welcomedb.set(`${message.guild.id}`, channel.id);
                return await msgdefer.edit({ content: `> Welcome System Was Now Updated To ${channel}.`})
            }
		}
	}
};