const { ButtonStyle } = require('discord.js');
const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageTruth extends Command {
	constructor(client){
		super(client, {
			name: "truth",
  			category: "truthordare",
  			alias: ["trut", "trth", "trt"],
  			cooldown: 5,
  			usage: `${process.env.prefix}truth`,
  			description: "Get A Random Truth.",
		});
	}
	async run(client, message){

		let msgdefer =  await client.functions.deferReply().message(message);
        let buttonRow = await client.functions.buttons(`Truth`, `truth`, ButtonStyle.Secondary, `Stop`, `trstop`, ButtonStyle.Danger);
        
        let msg = await msgdefer.edit({ content: ``, embeds: [await client.functions.generateTruth()], components: [buttonRow] });
		return await client.functions.collector(msg).truth(buttonRow, message.author.id);
	}
};