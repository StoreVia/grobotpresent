const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageKill extends Command {
	constructor(client) {
		super(client, {
			name: "kill",
  			category: "fun",
  			alias: ["kil"],
  			cooldown: 3,
  			usage: `${process.env.prefix}kill <userMention>`,
  			description: "Kill Someone.",
		});
	}
	async run(client, message) {

		const target = message.mentions.members.first();
        const author = message.author;
        const sentence = await client.functions.kill(target, author);
		let msgdefer = await client.functions.deferReply().message(message);

        if(target === author){
            return interaction.followUp({ content: `> You Can't Kill Your Self.`});
        }else if(target.id === client.user.id){
            return msgdefer.edit({ content: "> Why Are You Guys Trying To Kill Me." })
        } else if(target != author){
            return await msgdefer.edit({ content: `${await sentence}` });
        }
	}
};