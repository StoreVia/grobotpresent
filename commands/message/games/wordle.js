const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageWordle extends Command {
	constructor(client){
		super(client, {
			name: "wordle",
  			category: "games",
  			alias: ["wrdl", "wrdle"],
  			cooldown: 5,
  			usage: `${process.env.prefix}wordle`,
  			description: "Play Wordle Game.",
		});
	}
	async run(client, message){
        
        await client.functions.games(message, false).wordle();
	}
};