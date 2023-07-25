const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageHug extends Command {
	constructor(client) {
		super(client, {
			name: "hug",
  			category: "fun",
  			alias: ["hugg"],
  			cooldown: 3,
  			usage: `${process.env.prefix}hug <userMention>`,
  			description: "Hug Someone.",
		});
	}
	async run(client, message) {

		let user = message.mentions.members.first();
		let attachment = await client.functions.hug();
		let msgdefer = await client.functions.deferReply().message(message);

		if (!user){
			return msgdefer.edit({ content: `> Mention Someone To Hug.` })
		} else if(user.id === message.author.id){
			return msgdefer.edit({ files: [attachment], content: `${message.author} You Can't Hug Yourselft. Come I Will Hug You 🥰.` })
		} else {
			return msgdefer.edit({ files: [attachment],content: `${message.author} Hugs ${user}, Awww How Cute 🥰.` })
		}
	}
};