const Command = require('../../../structures/MessageCommandClass');
const { PermissionsBitField } = require('discord.js');

module.exports = class MessageChatBotDelete extends Command {
	constructor(client) {
		super(client, {
			name: "chatbotdelete",
  			category: "chatbot",
  			alias: ["cbd", "chatbd"],
  			cooldown: 3,
  			usage: `${process.env.prefix}chatbotdelete`,
  			description: "Delete Chatbot Channel.",
		});
	}
	async run(client, message) {


		const chatbotdb = client.db.table(`chatbot`);
        const checkchannel = await chatbotdb.get(`${message.guild.id}`);

		if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)){
            return message.reply({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
			if(!checkchannel){
                return await message.reply({ content: `> Chatbot Was Not Bounded To Any Channel.`})
            } else if(checkchannel){
                await chatbotdb.delete(`${message.guild.id}`);
                return await message.reply({ content: `> Chatbot Was Now Deleted In <#${checkchannel}>.`})
            }
		}
	}
};