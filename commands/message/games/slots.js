const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageSlots extends Command {
	constructor(client){
		super(client, {
			name: "slots",
  			category: "games",
  			alias: ["slts"],
  			cooldown: 5,
  			usage: `${process.env.prefix}slots`,
  			description: "Play Slots Game.",
		});
	}
	async run(client, message){

        await client.functions.games(message, false).slots();
	}
};