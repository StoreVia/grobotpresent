const Command = require('../../../structures/MessageCommandClass');
const { PermissionsBitField } = require('discord.js');

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

		let channel = message.mentions.channels.first();
		const chatbotdb = client.db.table(`chatbot`);
        const checkchannel = await chatbotdb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
			if(!channel){
				return await msgdefer.edit({ content: `> Mention A Channel To Set Chatbot.`})
			} else if(!checkchannel){
                await chatbotdb.set(`${message.guild.id}`, channel.id);
                return await msgdefer.edit({ content: `> Chatbot Was Now Bounded To ${channel}.`})
            } else if(channel.id === checkchannel){
                return await msgdefer.edit({ content: `> Chatbot Was Already Linked To ${channel}.`})
            } else if(channel.id != checkchannel){
                await chatbotdb.set(`${message.guild.id}`, channel.id);
                return await msgdefer.edit({ content: `> Chatbot Was Now Updated To ${channel}.`})
            }
		}
	}
};