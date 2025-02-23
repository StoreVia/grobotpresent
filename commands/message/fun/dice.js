const Command = require('../../../structures/Commands/MessageCommandClass');
const { ButtonStyle } = require(`discord.js`);

module.exports = class MessageDice extends Command {
	constructor(client){
		super(client, {
			name: "dice",
  			category: "fun",
  			alias: ["dc", "dce"],
  			cooldown: 5,
  			usage: `${process.env.prefix}dice`,
  			description: "Roll Dice.",
		});
	}
	async run(client, message){

		let buttonRow = await client.functions.buttons(`Roll Again`, `dice`, ButtonStyle.Secondary, `Stop`, `distop`, ButtonStyle.Danger);
		let randomNum = await client.functions.randomNum(6).natural();
		let embed = await client.functions.embedBuild().description(`🎲 You Got \`${randomNum}\``).build();
		let msgdefer = await client.functions.deferReply().message(message);

		let msg = await msgdefer.edit({ content: ``, embeds: [embed], components:  [buttonRow]});
		client.functions.collector(msg).dice(message.author.id, embed, buttonRow);
	}
};