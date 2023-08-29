const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageInvite extends Command {
	constructor(client){
		super(client, {
			name: "invite",
  			category: "info",
  			alias: ["inv"],
  			cooldown: 3,
  			usage: `${process.env.prefix}invite`,
  			description: "Gives You Invite Link Of Bot.",
		});
	}
	async run(client, message){

        let msgdefer = await client.functions.deferReply().message(message);
		return await msgdefer.edit({ content: ``, embeds: [client.functions.invite()] });
	}
};