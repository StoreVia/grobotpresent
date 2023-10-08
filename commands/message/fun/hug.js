const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageHug extends Command {
	constructor(client){
		super(client, {
			name: "hug",
  			category: "fun",
  			alias: ["hugg"],
  			cooldown: 5,
  			usage: `${process.env.prefix}hug <userMention>`,
  			description: "Hug Someone.",
		});
	}
	async run(client, message){

		let user = message.mentions.members.first();
		let attachment = await client.functions.hug();
		let msgdefer = await client.functions.deferReply().message(message);

		if(!user){
			return msgdefer.edit({ content: await client.functions.errorMsg().user() })
		} else if(user.id === message.author.id){
			return msgdefer.edit({ content: ``, embeds: [await client.functions.embedBuild().description(`${message.author} You Can't Hug Yourselft. Come I Will Hug You 🥰.`).image(`attachment://hug.gif`).footer().build()], files: [await attachment] })
		} else {
			return msgdefer.edit({ content: ``, embeds: [await client.functions.embedBuild().description(`${message.author} Hugs ${user}, Awww How Cute 🥰.`).image(`attachment://hug.gif`).footer().build()], files: [await attachment] })
		}
	}
};