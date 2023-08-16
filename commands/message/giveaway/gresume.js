const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageGiveawayResume extends Command {
	constructor(client){
		super(client, {
			name: "gresume",
  			category: "giveaway",
  			alias: ["gs", "giveawayresume"],
  			cooldown: 3,
  			usage: `${process.env.prefix}gresume <giveaway messageId or Prize>`,
  			description: "Resume A Giveaway.",
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