const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageRoast extends Command {
	constructor(client){
		super(client, {
			name: "roast",
  			category: "fun",
  			alias: ["rst"],
  			cooldown: 3,
  			usage: `${process.env.prefix}roast <userMention>`,
  			description: "Roast Someone.",
		});
	}
	async run(client, message){

		let user = message.mentions.members.first();
		let msgdefer = await client.functions.deferReply().message(message);

        if(!user){
            return await msgdefer.edit({ content: `> Mention Someone To Roast.` })
        } else if(user.id === message.author.id){
            return await msgdefer.edit({ content: "> You Can't Roast Your Self." })
        } else if(user.id === client.user.id){
            return await msgdefer.edit({ content: "> Why Are You Guys Trying To Roast Me." })
        } else if(user){
            return await msgdefer.edit({ content: `${user}, ${await client.functions.roast(user)}.` })
        }
	}
};