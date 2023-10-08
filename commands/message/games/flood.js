const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageFlood extends Command {
	constructor(client){
		super(client, {
			name: "flood",
  			category: "games",
  			alias: ["flod", "fld"],
  			cooldown: 5,
  			usage: `${process.env.prefix}flood`,
  			description: "Play Flood Game.",
		});
	}
	async run(client, message){

        await client.functions.games(message, false).flood();
	}
};