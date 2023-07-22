const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageDice extends Command {
	constructor(client) {
		super(client, {
			name: "dice",
  			category: "fun",
  			alias: ["dc", "dce"],
  			cooldown: 3,
  			usage: `${process.env.prefix}dice`,
  			description: "Roll Dice.",
		});
	}
	async run(client, message) {

		let buttonRow = await client.functions.buttons().two(`Roll Again`, `dice`, `Stop`, `distop`);
		let randomNum = await client.functions.randomNum(6).natural();
		let embed = await client.functions.embed().onlyDescription(`🎲 You Got \`${randomNum}\``);

		let msg = await message.reply({ embeds: [embed], components:  [buttonRow]});
		client.functions.collector(msg).dice(message.author.id, embed, buttonRow);
	}
};