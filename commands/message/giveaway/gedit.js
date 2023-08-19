const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageGiveawayEdit extends Command {
	constructor(client){
		super(client, {
			name: "gedit",
  			category: "giveaway",
  			alias: ["giveawayedit"],
  			cooldown: 3,
  			usage: `${process.env.prefix}gedit <MessageId/Prize> <Winner/Prize(TheThingYouWantToEdit)> <NewWinnerCount/NewPrize>`,
  			description: "Delete A Giveaway.",
		});
	}
	async run(client, message, args){

        let msgdefer = await client.functions.deferReply().message(message);

        if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else {
            if(!args[0]){
                return msgdefer.edit({ content: `> Enter Giveaway MessageId/Prize.` });
            } else if(!args[1]){
                return msgdefer.edit({ content: `> Enter Winneres/Prize(TheThingYouWantToEdit).` });
            } else if(!args[2]){
                return msgdefer.edit({ content: `> Enter NewWinnerCount/NewPrize.` });
            } else {
                const query = args[0];
                const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id);
                if(giveaway){
                    if(args[1].toLowerCase().includes("w", "wi", "win", "winn", "winne", "winner", "winners")){
                        if(!parseInt(args[2])){
                            return msgdefer.edit({ content: `> The Number Of WinnerCount Must Be An Integer.` });
						} else if (args[2] < 1){
                            return msgdefer.edit({ content: `> WinnerCount Must Be More Than One Number.` });
						} else {
                            await client.functions.giveaway().edit(giveaway.messageId, `${parseInt(args[2])}(win)`).then(() => {
                                return msgdefer.edit({content: `> Done✅. Giveaway Updated.`})
                            })
                        }
                    } else if(args[1].toLowerCase().includes("p", "pr", "pri", "priz", "prize", "prizes")){
                        await client.functions.giveaway().edit(giveaway.messageId, `${args.slice(2).join(' ')}(pri)`).then(() => {
                            return msgdefer.edit({content: `> Done✅. Giveaway Updated.`})
                        })
                    }
                } else {
                    return msgdefer.edit({ content: `> No Giveaway Found Of ${query}. Else Try By Entering Message Id.` });
                }
            }
        }
    }
}