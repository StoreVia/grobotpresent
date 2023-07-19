const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageFlipText extends Command {
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

        if(!string){
			return message.reply({ content: `> Please Provide A Specific Text Or Sentence That You Would Like To Search A Gif.` })
		} else {
            return await message.channel.send({ embeds: [await client.functions.gif(string)]});
        }
	}
};