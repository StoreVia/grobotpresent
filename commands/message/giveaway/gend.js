const Command = require('../../../structures/Commands/MessageCommandClass');
const parsec = require("parsec");

module.exports = class MessageGiveawayEnd extends Command {
	constructor(client){
		super(client, {
			name: "gend",
  			category: "giveaway",
  			alias: ["ge", "giveawayend"],
  			cooldown: 3,
  			usage: `${process.env.prefix}gend <giveaway messageId or prize>`,
  			description: "End A Giveaway.",
		});
	}
	async run(client, message, args){

        let msgdefer = await client.functions.deferReply().message(message);
        let query = args.join(" ");
        
        if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else if(!query){
            return await msgdefer.edit({ content: `> Enter Message Id Or Prize.` });
        } else {
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id);
            if(!giveaway){
                return await msgdefer.edit({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else if(giveaway.ended){
                return msgdefer.edit({ content: `> This Giveaway Has Been Already Ended. Else Try By Entering Message Id.` })
            } else {
                await client.functions.giveaway().end(giveaway.messageId).then(() => {
                    return msgdefer.edit({content: `> Done✅. Giveaway Ended.` })
                }).catch((e) => {
                    if(e.includes(`already ended`)){
                        return msgdefer.edit({ content: `> Please Try To Enter Message Id As There Are Many Giveaway's With The Same Prize.` })
                    } 
                })
            }
        }
    }
}