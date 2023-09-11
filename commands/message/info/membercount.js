const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageMemberCount extends Command {
	constructor(client){
		super(client, {
			name: "membercount",
  			category: "info",
  			alias: ["mc"],
  			cooldown: 3,
  			usage: `${process.env.prefix}membercount`,
  			description: "Gives You Server Member Count.",
		});
	}
	async run(client, message){

        let msgdefer = await client.functions.deferReply().message(message)
		return await msgdefer.edit({ content: ``, embeds: [await client.functions.memberCount(message)] });
	}
};