const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageGiveawayCreate extends Command {
	constructor(client){
		super(client, {
			name: "gcreate",
  			category: "giveaway",
  			alias: ["gc", "giveawaycreate"],
  			cooldown: 3,
  			usage: `${process.env.prefix}gcreate`,
  			description: "Create A Giveaway.",
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