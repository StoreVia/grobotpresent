const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageGreyScale extends Command {
	constructor(client){
		super(client, {
			name: "greyscale",
  			category: "image",
  			alias: ["gryscle", "gscle", "gs"],
  			cooldown: 3,
  			usage: `${process.env.prefix}greyscale <userMention>`,
  			description: "Add GreyScale Image Effect.",
		});
	}
	async run(client, message){

        let msgdefer = await client.functions.deferReply().message(message);
        let user = message.mentions.members.first();

        if(!user){
            return await msgdefer.edit({ content: await client.functions.errorMsg().user() })
        } else {
            return await msgdefer.edit({ content: ``, files: [await client.functions.image(user).greyScale()] })
        }
	}
};