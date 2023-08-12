const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageFlipText extends Command {
	constructor(client){
		super(client, {
			name: "fliptext",
  			category: "fun",
  			alias: ["ft", "flptxt"],
  			cooldown: 3,
  			usage: `${process.env.prefix}fliptext <string>`,
  			description: "Flip Text UpsideDown.",
		});
	}
	async run(client, message, args){
		
		let string = args.join(" ");
		let msgdefer = await client.functions.deferReply().message(message);

		if(!string){
			return msgdefer.edit({ content: `> Please Provide A Specific Text Or Sentence That You Would Like To Flip.` })
		} else {
			return await msgdefer.edit({ content: `${await client.functions.filpText(args.join(" "))}`});
		}
	}
};