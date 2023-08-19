const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageGiveawayPause extends Command {
	constructor(client){
		super(client, {
			name: "gpause",
  			category: "giveaway",
  			alias: ["gp", "giveawaypause"],
  			cooldown: 3,
  			usage: `${process.env.prefix}gpause <giveaway messageId or Prize>`,
  			description: "Pause A Giveaway.",
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
                client.functions.giveaway().pause(giveaway.messageId).then(() => {
                    return msgdefer.edit({content: `> Done✅. Giveaway Resumed.` })
                }).catch((e) => {
                    if(e.includes(`already paused`)){
                        return msgdefer.edit({ content: `> This Giveaway Has Been Already Paused. Else Try By Entering Message Id.` })
                    } else if(e.includes(`already ended`)){
                        return msgdefer.edit({ content: `> This Giveaway Was Ended And Can't Be Paused. Else Try By Entering Message Id.` })
                    }
                })
            }
        }
	}
};