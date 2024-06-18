const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageTicketSendPanel extends Command {
	constructor(client){
		super(client, {
			name: "ticketdelete",
  			category: "tikcet",
  			alias: ["tcktdltl", "td"],
  			cooldown: 5,
  			usage: `${process.env.prefix}ticketdelete`,
  			description: "Delete Ticket Panel.",
		});
	}
	async run(client, message){

		const ticketdb = client.db.table(`ticket`);
        let ticketcheck = await ticketdb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else if(!ticketcheck){
            return await message.editReply({ content: `> Ticket System Was Not Setup In Your Guild.`})
        } else if(ticketcheck){
            await ticketdb.delete(`${message.guild.id}`);
            return await message.editReply({ content: `> Ticket System Was Not Deleted In Your Guild.`})
        }
	}
};