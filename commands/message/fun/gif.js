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

        if(!string){
			return message.reply({ content: `> Please Provide A Specific Text Or Sentence That You Would Like To Flip.` })
		} else {
            return await message.reply({ embeds: [await client.functions.gif(await client.functions.getOptions(interaction).string(`string`))]});
        }
	}
};