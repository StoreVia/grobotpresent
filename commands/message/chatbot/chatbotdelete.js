const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageChatBotDelete extends Command {
	constructor(client){
		super(client, {
			name: "chatbotdelete",
  			category: "chatbot",
  			alias: ["cbd", "chatbd"],
  			cooldown: 3,
  			usage: `${process.env.prefix}chatbotdelete`,
  			description: "Delete Chatbot Channel.",
		});
	}
	async run(client, message){

		const chatbotdb = client.db.table(`chatbot`);
        const checkchannel = await chatbotdb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
			if(!checkchannel){
                return await msgdefer.edit({ content: `> Chatbot Was Not Bounded To Any Channel.`})
            } else if(checkchannel){
                await chatbotdb.delete(`${message.guild.id}`);
                return await msgdefer.edit({ content: `> Chatbot Was Now Deleted In <#${checkchannel}>.`})
            }
		}
	}
};