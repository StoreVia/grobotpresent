const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageGiveawayResume extends Command {
	constructor(client){
		super(client, {
			name: "gresume",
  			category: "giveaway",
  			alias: ["gr", "giveawayresume"],
  			cooldown: 5,
  			usage: `${process.env.prefix}gresume <giveaway messageId or prize>`,
  			description: "Resume A Giveaway.",
		});
	}
	async run(client, message, args){

        let msgdefer = await client.functions.deferReply().message(message);
		let query = args.join(" ");

        if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else {
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id);
            if(!giveaway){
                return msgdefer.edit({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else {
                client.functions.giveaway().resume(giveaway.messageId).then(() => {
                    return msgdefer.edit({content: `> Done✅. Giveaway Resumed.` })
                }).catch((e) => {
                    if(e.includes(`not paused`)){
                        return msgdefer.edit({ content: `> This Giveaway Was Not Paused. Else Try By Entering Message Id.` })
                    } else if(e.includes(`already ended`)){
                        return msgdefer.edit({ content: `> This Giveaway Was Ended And Can't Be Resumed. Else Try By Entering Message Id.` })
                    } 
                })
            }
        }
	}
};