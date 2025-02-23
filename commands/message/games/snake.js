const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageSnake extends Command {
	constructor(client){
		super(client, {
			name: "snake",
  			category: "games",
  			alias: ["snk", "snke", "ske"],
  			cooldown: 5,
  			usage: `${process.env.prefix}snake`,
  			description: "Play Snake Game.",
		});
	}
	async run(client, message){

        await client.functions.games(message, false).snake();
	}
};