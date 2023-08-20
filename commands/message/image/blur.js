const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageBlur extends Command {
	constructor(client){
		super(client, {
			name: "blur",
  			category: "image",
  			alias: ["blr"],
  			cooldown: 3,
  			usage: `${process.env.prefix}blur <userMention>`,
  			description: "Add Blur Image Effect.",
		});
	}
	async run(client, message){

        let msgdefer = await client.functions.deferReply().message(message);
        let user = message.mentions.members.first();

        if(!user){
            return await msgdefer.edit({ content: await client.functions.errorMsg().user() })
        } else {
            
        }
	}
};