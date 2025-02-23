const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageInvert extends Command {
	constructor(client){
		super(client, {
			name: "invert",
  			category: "image",
  			alias: ["invrt", "ivrt"],
  			cooldown: 5,
  			usage: `${process.env.prefix}invert <userMention>`,
  			description: "Add Invert Image Effect.",
		});
	}
	async run(client, message){

        let msgdefer = await client.functions.deferReply().message(message);
        let user = message.mentions.members.first();

        if(!user){
            return await msgdefer.edit({ content: await client.functions.errorMsg().user() })
        } else {
            return await msgdefer.edit({ content: ``, files: [await client.functions.image(user).invert()] })
        }
	}
};