const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageJail extends Command {
	constructor(client){
		super(client, {
			name: "jail",
  			category: "image",
  			alias: ["jal", "jil"],
  			cooldown: 5,
  			usage: `${process.env.prefix}jail <userMention>`,
  			description: "Add Jail Image Effect.",
		});
	}
	async run(client, message){

        let msgdefer = await client.functions.deferReply().message(message);
        let user = message.mentions.members.first();

        if(!user){
            return await msgdefer.edit({ content: await client.functions.errorMsg().user() })
        } else {
            return await msgdefer.edit({ content: ``, files: [await client.functions.image(user).jail()] })
        }
	}
};