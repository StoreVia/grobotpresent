const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageHangMan extends Command {
	constructor(client){
		super(client, {
			name: "hangman",
  			category: "games",
  			alias: ["hm", "hman"],
  			cooldown: 5,
  			usage: `${process.env.prefix}hangman`,
  			description: "Play Hangman Game.",
		});
	}
	async run(client, message){

        await client.functions.games(message, false).hangMan();
	}
};