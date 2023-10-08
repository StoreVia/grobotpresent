const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageTrivia extends Command {
	constructor(client){
		super(client, {
			name: "trivia",
  			category: "games",
  			alias: ["trva", "trvia"],
  			cooldown: 5,
  			usage: `${process.env.prefix}trivia`,
  			description: "Play Trivia Game.",
		});
	}
	async run(client, message){

        await client.functions.games(message, false).trivia();
	}
};