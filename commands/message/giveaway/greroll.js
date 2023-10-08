const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageGiveawayReRoll extends Command {
	constructor(client){
		super(client, {
			name: "greroll",
  			category: "giveaway",
  			alias: ["grr", "giveawayrer", "giveawayrroll", "giveawayreroll"],
  			cooldown: 5,
  			usage: `${process.env.prefix}greroll <giveaway messageId or prize>`,
  			description: "ReRoll A Giveaway.",
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
            } else if(!giveaway.ended){
                return msgdefer.edit({ content: `> The Giveaway isn't Ended To Reroll.` })
            } else {
                await client.functions.giveaway().reRoll(giveaway.messageId).then(() => {
                    return msgdefer.edit({content: `> Done✅. Giveaway Rerolled.` })
                })
            }
        }
	}
};