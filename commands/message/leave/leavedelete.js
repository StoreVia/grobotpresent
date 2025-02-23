const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageLeaveDelete extends Command {
	constructor(client){
		super(client, {
			name: "leavedelete",
  			category: "leave",
  			alias: ["lvedt", "ldel", "ld"],
  			cooldown: 5,
  			usage: `${process.env.prefix}leavedelete`,
  			description: "Delete Leave Channel.",
		});
	}
	async run(client, message){

        const leavedb = client.db.table(`leave`);
        const checkchannel = await leavedb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
			if(!checkchannel){
                return await msgdefer.edit({ content: `> Leave System Was Not Bounded To Any Channel.`})
            } else if(checkchannel){
                await leavedb.delete(`${message.guild.id}`);
                return await msgdefer.edit({ content: `> Leave System Was Now Deleted In <#${checkchannel}>.`})
            }
		}
	}
};