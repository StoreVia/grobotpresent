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

		await message.reply({ content: `${await client.functions.filpText(args.join(" "))}`});
	}
};