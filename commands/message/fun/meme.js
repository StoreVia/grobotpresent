const Command = require('../../../structures/MessageCommandClass');
const { ButtonStyle } = require(`discord.js`);
const titlecase = require(`titlecase`);

module.exports = class MessageMeme extends Command {
	constructor(client) {
		super(client, {
			name: "meme",
  			category: "fun",
  			alias: ["mme"],
  			cooldown: 3,
  			usage: `${process.env.prefix}meme`,
  			description: "Get A Random Meme.",
		});
	}
	async run(client, message) {

		let msgdefer = await client.functions.deferReply().message(message);
		let buttonRow = await client.functions.buttons(`NextMeme`, `meme`, ButtonStyle.Secondary, `Stop`, `mestop`, ButtonStyle.Danger);
		let meme = await client.functions.genrateMeme();
		let embed = await client.functions.embedBuild().title(`${titlecase(meme.title)}`).url(`${meme.url}`).image(meme.memeImage).footer().build();
		
		let msg = await msgdefer.edit({ content: ``, embeds: [embed], components: [buttonRow] });
		await client.functions.collector(msg).meme(message.author.id, embed, buttonRow);
	}
};