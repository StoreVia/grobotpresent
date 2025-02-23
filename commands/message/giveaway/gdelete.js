const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageGiveawayDelete extends Command {
	constructor(client){
		super(client, {
			name: "gdelete",
  			category: "giveaway",
  			alias: ["gd", "giveawaydelete"],
  			cooldown: 5,
  			usage: `${process.env.prefix}gdelete <giveaway messageId or prize>`,
  			description: "Delete A Giveaway.",
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
            } else {
                await client.functions.giveaway().delet(giveaway.messageId);
                return await msgdefer.edit({content: `> Done✅. Giveaway Deleted.` });
            }
        }
    }
}