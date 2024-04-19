const Command = require('../../../structures/Commands/MessageCommandClass');
const { ButtonStyle } = require(`discord.js`);

module.exports = class MessageFact extends Command {
	constructor(client){
		super(client, {
			name: "fact",
  			category: "utility",
  			alias: ["facts", "fct"],
  			cooldown: 5,
  			usage: `${process.env.prefix}fact`,
  			description: "Gives A Random Fact.(premium).",
		});
	}
	async run(client, message){
		
		let msgdefer = await client.functions.deferReply().message(message);
        let buttonRow = await client.functions.buttons(`Next`, `fact`, ButtonStyle.Secondary, `Stop`, `stop`, ButtonStyle.Danger);
		let fact = await client.functions.randomFact();
		let embed = await client.functions.embedBuild().title(`Facts`).thumbnail(`${process.env.fact_thumbnail}`).description(`${fact}`).footer().build();

		let message1 = await msgdefer.edit({ content: ``, embeds: [embed], components: [buttonRow] });
		await client.functions.collector(message1).fact(message.author.id, embed, buttonRow)
	}
};