const Command = require('../../../structures/Commands/MessageCommandClass');
const parsec = require("parsec");

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
	async run(client, message){

        let msgdefer = await client.functions.deferReply().message(message);

        if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else {
            
        }
	}
};