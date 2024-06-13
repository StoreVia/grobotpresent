const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageTicketSendPanel extends Command {
	constructor(client){
		super(client, {
			name: "ticketsendpanel",
  			category: "tikcet",
  			alias: ["tcktsndpnl", "tsp",],
  			cooldown: 5,
  			usage: `${process.env.prefix}ticketsendpanel`,
  			description: "Send/Activate Ticket Panel.",
		});
	}
	async run(client, message){

		const ticketdb = client.db.table(`ticket`);
        const ticketembeddb = client.db.table(`ticketembed`);
        let ticketcheck = await ticketdb.get(`${message.guild.id}`);
        let ticketembedcheck = await ticketembeddb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else if(!ticketcheck){
    		return msgdefer.edit({ content: `> Ticket System Can Only Be Set By Slash Command. Please Use "/ticket setup" Command.`});
		} else {
			let channel = await client.functions.ticketPanelSend(message, ticketcheck, ticketembedcheck);
            return await msgdefer.edit({ content: `> Done✅. Activated/Sent Ticket Panel In ${channel}.` });
		}
	}
};