const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageWelcomeDelete extends Command {
	constructor(client){
		super(client, {
			name: "welcomedelete",
  			category: "welcome",
  			alias: ["wlcmedt", "wdel", "wd"],
  			cooldown: 5,
  			usage: `${process.env.prefix}welcomedelete`,
  			description: "Delete Welcome Channel.",
		});
	}
	async run(client, message){

        const welcomedb = client.db.table(`welcome`);
        const checkchannel = await welcomedb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
			if(!checkchannel){
                return await msgdefer.edit({ content: `> Welcome System Was Not Bounded To Any Channel.`})
            } else if(checkchannel){
                await welcomedb.delete(`${message.guild.id}`);
                return await msgdefer.edit({ content: `> Welcome System Was Now Deleted In <#${checkchannel}>.`})
            }
		}
	}
};