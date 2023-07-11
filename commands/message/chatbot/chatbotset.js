const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageChatBotSet extends Command {
	constructor(client) {
		super(client, {
			name: "chatbotset",
  			category: "chatbot",
  			alias: ["cbs", "chatbs"],
  			cooldown: 3,
  			usage: `${process.env.prefix}chatbotset <channelMention>`,
  			description: "Set Chatbot Channel.",
		});
	}

	async run(client, message) {

		

	}
};