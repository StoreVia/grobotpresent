const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageCatSay extends Command {
	constructor(client) {
		super(client, {
			name: "catsay",
  			category: "fun",
  			alias: ["cs"],
  			cooldown: 3,
  			usage: `${process.env.prefix}catsay <text>`,
  			description: "Make Cat To Say Something.",
		});
	}
	async run(client, message, args) {

		const string = args.join(" ")
        
        if(!string){
            return message.reply({ content: `> Please Provide a Specific Text Or Sentence That You Would Like the Cat to Say.` })
        } else {
            return await message.channel.send({ files: [{ attachment: `${await client.functions.catSay(string)}`, name: "catsay.png" }]});
        }
	}
};