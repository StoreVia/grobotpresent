const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageHelp extends Command {
	constructor(client){
		super(client, {
			name: "help",
  			category: "info",
  			alias: ["hlp", "command", "commands"],
  			cooldown: 3,
  			usage: `${process.env.prefix}help`,
  			description: "Gives List Of Bot Commands.",
		});
	}
	async run(client, message){

		
	}
};