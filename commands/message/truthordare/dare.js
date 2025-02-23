const { ButtonStyle } = require('discord.js');
const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageDare extends Command {
	constructor(client){
		super(client, {
			name: "dare",
  			category: "truthordare",
  			alias: ["dre", "dr"],
  			cooldown: 5,
  			usage: `${process.env.prefix}truth`,
  			description: "Get A Random Dare.",
		});
	}
	async run(client, message){

		let msgdefer =  await client.functions.deferReply().message(message);
        let buttonRow = await client.functions.buttons(`Dare`, `dare`, ButtonStyle.Secondary, `Stop`, `drstop`, ButtonStyle.Danger);
        
        let msg = await msgdefer.edit({ content: ``, embeds: [await client.functions.generateDare()], components: [buttonRow] });
		return await client.functions.collector(msg).dare(buttonRow, message.author.id);
	}
};