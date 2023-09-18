const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageUpdates extends Command {
	constructor(client){
		super(client, {
			name: "updates",
  			category: "info",
  			alias: ["upts"],
  			cooldown: 3,
  			usage: `${process.env.prefix}updates`,
  			description: "Get Latest Update Note.",
		});
	}
	async run(client, message){

		let msgdefer = await client.functions.deferReply().message(message)
		return await msgdefer.edit({ content: ``, embeds: [await client.functions.updates(message)] });
	}
};