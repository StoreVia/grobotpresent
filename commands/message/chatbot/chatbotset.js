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

		if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)){
            return message.reply({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
			if(!checkchannel){
                await chatbotdb.set(`${message.guild.id}`, channel.id);
                return await message.reply({ content: `> Chatbot Was Now Bounded To ${channel}.`})
            } else if(channel.id === checkchannel){
                return await message.reply({ content: `> Chatbot Was Already Linked To ${channel}.`})
            } else if(channel.id != checkchannel){
                await chatbotdb.set(`${message.guild.id}`, channel.id);
                return await message.reply({ content: `> Chatbot Was Now Updated To ${channel}.`})
            }
		}
	}
};