const Command = require('../../../structures/Commands/MessageCommandClass');
const parsec = require("parsec");

module.exports = class MessageGiveawayCreate extends Command {
	constructor(client){
		super(client, {
			name: "gdelete",
  			category: "giveaway",
  			alias: ["gd", "giveawaydelete"],
  			cooldown: 3,
  			usage: `${process.env.prefix}gdelete <giveaway messageId or Prize>`,
  			description: "Delete A Giveaway.",
		});
	}
	async run(client, message, args){

        let msgdefer = await client.functions.deferReply().message(message);
        const query = args.join(" ");

        if(!query){
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