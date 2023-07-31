const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageNitro extends Command {
	constructor(client){
		super(client, {
			name: "nitro",
  			category: "fun",
  			alias: ["ntro", "nro"],
  			cooldown: 3,
  			usage: `${process.env.prefix}nitro`,
  			description: "Get Free Nitro Link.",
		});
	}
	async run(client, message){

		let msgdefer = await client.functions.deferReply().message(message);
		let msg = await msgdefer.edit({ content:``, embeds: [await client.functions.embedBuild().description(`Discord Nitro Payment Started!`).build()]});
        await client.functions.nitro(msg)
	}
};