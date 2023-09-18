const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageUserInfo extends Command {
	constructor(client){
		super(client, {
			name: "userinfo",
  			category: "info",
  			alias: ["userinf", "uinfo", "ui"],
  			cooldown: 3,
  			usage: `${process.env.prefix}userinfo <userMention>`,
  			description: "Gives You Userinfo.",
		});
	}
	async run(client, message){

		let msgdefer = await client.functions.deferReply().message(message)
        let user = await message.mentions.members.first() || message.member;

        let functions = await client.functions.userInfo(message, false, user);
        return await msgdefer.edit({ content: `${await functions.content}`, embeds: [await functions.embed]});
	}
};