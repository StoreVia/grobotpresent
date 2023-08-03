const Command = require('../../../structures/MessageCommandClass');

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

        let channel = null;
        let prize = null;
        let duration = null;
        let winnercount = null;
        let hosted = null;
        let msgdefer = await client.functions.deferReply().message(message);

        
	}
};