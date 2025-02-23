const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageAvatar extends Command {
	constructor(client){
		super(client, {
			name: "avatar",
  			category: "info",
  			alias: ["avtr", "avt"],
  			cooldown: 5,
  			usage: `${process.env.prefix}avatar <userMention>`,
  			description: "Get User's Avatar.",
		});
	}
	async run(client, message){

		let msgdefer = await client.functions.deferReply().message(message);
		let user = message.mentions.members.first();

        if(!user){
            return await msgdefer.edit({ content: await client.functions.errorMsg().user() })
        } else {
			let functions = await client.functions.avatar(user, 4096, true);
			return await msgdefer.edit({ content: ``, embeds: [functions.embed], components: [functions.buttonRow] })
		}
		
	}
};