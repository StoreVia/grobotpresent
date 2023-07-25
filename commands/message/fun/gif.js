const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageGif extends Command {
	constructor(client) {
		super(client, {
			name: "gif",
  			category: "fun",
  			alias: ["gf"],
  			cooldown: 3,
  			usage: `${process.env.prefix}gid <string>`,
  			description: "Search For A Gif.",
		});
	}
	async run(client, message, args) {

		let string = args.join(" ");
		let msgdefer = await client.functions.deferReply().message(message);

        if(!string){
			return msgdefer.edit({ content: `> Please Provide A Specific Text Or Sentence That You Would Like To Search A Gif.` })
		} else {
            return msgdefer.edit({ content: ``, embeds: [await client.functions.embedBuild().title(`${string}`).image(await client.functions.gif(string)).footer().build()]});
        }
	}
};