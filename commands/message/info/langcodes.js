const { ButtonStyle } = require('discord.js');
const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageLangCodes extends Command {
	constructor(client){
		super(client, {
			name: "languagecodes",
  			category: "info",
  			alias: ["lc", "langcodes"],
  			cooldown: 5,
  			usage: `${process.env.prefix}langcodes`,
  			description: "Get Information About All Language Codes.",
		});
	}
	async run(client, message){

		let msgdefer = await client.functions.deferReply().message(message);
        const buttonRow = await client.functions.buttons(`Language`, `langcodes`, ButtonStyle.Secondary, `Stop`, `lcstop`, ButtonStyle.Danger);
        let msg = await msgdefer.edit({ content: `> **Click Below Button To View All Language Codes.**`, components: [buttonRow] });
		return await client.functions.collector(msg).language(buttonRow, message.author.id);
	}
};