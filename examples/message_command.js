const Command = require('../../../structures/MessageCommandClass');

module.exports = class Message extends Command {
	constructor(client){
		super(client, {
			name: "",
  			category: "",
  			alias: [""],
  			cooldown: 3,
  			usage: `${process.env.prefix}`,
  			description: ".",
		});
	}
	async run(client, message){

        //your_code
	}
};