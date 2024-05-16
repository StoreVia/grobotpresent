const Command = require('../../../structures/Commands/MessageCommandClass');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require(`discord.js`);

module.exports = class MessageWelcomeSet extends Command {
	constructor(client){
		super(client, {
			name: "welcomeedit",
  			category: "welcome",
  			alias: ["wlcmedt", "wedit", "we"],
  			cooldown: 5,
  			usage: `${process.env.prefix}welcomeedit`,
  			description: "Edit Text Welcome Message When A User Join's Server.",
		});
	}
	async run(client, message, args){

        let text = args.join(" ")
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
            if(!text){
                return msgdefer.edit({ content: `Enter Text That Should Be Displayed When A Use Joined Server.` });
            } else {
                
            }   
        }
	}
};