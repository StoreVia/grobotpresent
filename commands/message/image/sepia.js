const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageSepia extends Command {
	constructor(client){
		super(client, {
			name: "sepia",
  			category: "image",
  			alias: ["spia", "sp"],
  			cooldown: 3,
  			usage: `${process.env.prefix}sepia <userMention>`,
  			description: "Add Sepia Image Effect.",
		});
	}
	async run(client, message){

        let msgdefer = await client.functions.deferReply().message(message);
        let user = message.mentions.members.first();

        if(!user){
            return await msgdefer.edit({ content: await client.functions.errorMsg().user() })
        } else {
            return await msgdefer.edit({ content: ``, files: [await client.functions.image(user).sepia()] })
        }
	}
};