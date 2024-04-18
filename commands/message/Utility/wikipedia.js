const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageWikipedia extends Command {
	constructor(client){
		super(client, {
			name: "wikipedia",
  			category: "utility",
  			alias: ["wiki", "wp"],
  			cooldown: 5,
  			usage: `${process.env.prefix}wikipedia <string>`,
  			description: "Search Something In Wikipedia.",
		});
	}
	async run(client, message, args){
		
		const query = args.join(" ");
		let msgdefer = await client.functions.deferReply().message(message);
		let embed = await client.functions.wikipedia(query);
		
		if(!query){
			return await msgdefer.edit({ content: `> Enter Some Query To Search In Wikipedia.` })
		} else {
			return await msgdefer.edit({ content: ``, embeds: [embed.embedUpdate] });
		}
	}
};