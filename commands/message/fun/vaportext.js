const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageVaporText extends Command {
	constructor(client){
		super(client, {
			name: "vaportext",
  			category: "fun",
  			alias: ["vt", "vprtxt"],
  			cooldown: 3,
  			usage: `${process.env.prefix}vaportext <string>`,
  			description: "Convert Normal Text To Vapor Text.",
		});
	}
	async run(client, message, args){

		let msgdefer = await client.functions.deferReply().message(message);
        let string = args.join(" ");

        if(!string){
            return msgdefer.edit({ content: `> Provide A Text Or Sentence That You Want To Convert To Vaportext.` })
        } else {
            return await msgdefer.edit({ content: `${await client.functions.vaporText(string)}` })
        }
	}
};