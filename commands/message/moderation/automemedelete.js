const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageAutoMemeDelete extends Command {
	constructor(client){
		super(client, {
			name: "automemedelete",
  			category: "moderation",
  			alias: ["amemedelete", "automdelete", "automd", "amd"],
  			cooldown: 5,
  			usage: `${process.env.prefix}automemedelete <channelMention>`,
  			description: "Delete Automeme Channel.",
		});
	}
	async run(client, message){

		const automemedb = client.db.table(`automeme`);
        const checkchannel = await automemedb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
			if(!checkchannel){
                return await msgdefer.edit({ content: `> Automeme Was Not Bounded To Any Channel.`})
            } else if(checkchannel){
                await automemedb.delete(`${message.guild.id}`);
                return await msgdefer.edit({ content: `> Automeme Was Now Deleted In <#${checkchannel}>.`})
            }
		}
	}
};