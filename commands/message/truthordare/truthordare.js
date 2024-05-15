const { ButtonStyle } = require('discord.js');
const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageTruthOrDare extends Command {
	constructor(client){
		super(client, {
			name: "truthordare",
  			category: "truthordare",
  			alias: ["trtordre", "trordr", "tod"],
  			cooldown: 5,
  			usage: `${process.env.prefix}truthordare`,
  			description: "Get A Random Truth Or Dare.",
		});
	}
	async run(client, message){

		let msgdefer =  await client.functions.deferReply().message(message);
        let buttonRow = await client.functions.buttons(`Tod`, `tod`, ButtonStyle.Secondary, `Stop`, `todstop`, ButtonStyle.Danger);
        
        let msg = await msgdefer.edit({ content: ``, embeds: [await client.functions.generateTruthOrDare()], components: [buttonRow] });
		return await client.functions.collector(msg).truthordare(buttonRow, message.author.id);
	}
};