const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageTwoZeroFourEight extends Command {
	constructor(client){
		super(client, {
			name: "2048",
  			category: "games",
  			alias: ["tzfe", "twozerofoureight"],
  			cooldown: 3,
  			usage: `${process.env.prefix}2048`,
  			description: "Play 2048 Game.",
		});
	}
	async run(client, message){

        await client.functions.games(message, false).twozerofoureight();
	}
};