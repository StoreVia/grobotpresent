const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageFlipText extends Command {
	constructor(client) {
		super(client, {
			name: "fliptext",
  			category: "fun",
  			alias: ["ft", "flptxt"],
  			cooldown: 3,
  			usage: `${process.env.prefix}fliptext <string>`,
  			description: "Flip Text UpsideDown.",
		});
	}
	async run(client, message, args) {
		
		let string = args.join(" ");

		if(!string){
			return message.reply({ content: `> Please Provide A Specific Text Or Sentence That You Would Like To Flip.` })
		} else {
			return await message.channel.send({ content: `${await client.functions.filpText(args.join(" "))}`});
		}
	}
};