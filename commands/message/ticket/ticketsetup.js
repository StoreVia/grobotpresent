const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageTicketSetup extends Command {
	constructor(client){
		super(client, {
			name: "ticketsetup",
  			category: "tikcet",
  			alias: ["tcktstp", "tsetup", "ts"],
  			cooldown: 5,
  			usage: `${process.env.prefix}ticketsetup`,
  			description: "Setup Ticket System.",
		});
	}
	async run(client, message){

		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else {
    		return msgdefer.edit({ content: `> Ticket System Can Only Be Set By Slash Command. Please Use "/ticket setup" Command.`});
		}
	}
};