const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageCatSay extends Command {
	constructor(client){
		super(client, {
			name: "catsay",
  			category: "fun",
  			alias: ["cs"],
  			cooldown: 3,
  			usage: `${process.env.prefix}catsay <text>`,
  			description: "Make Cat To Say Something.",
		});
	}
	async run(client, message, args){

		const string = args.join(" ");
		let msgdefer = await client.functions.deferReply().message(message);
        
        if(!string){
            return msgdefer.edit({ content: `> Please Provide A Specific Text Or Sentence That You Would Like The Cat To Say.` })
        } else {
            return await msgdefer.edit({ content: ``, files: [{ attachment: `${await client.functions.catSay(string)}`, name: "catsay.png" }]});
        }
	}
};