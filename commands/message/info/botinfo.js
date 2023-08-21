const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageBotInfo extends Command {
	constructor(client){
		super(client, {
			name: "botinfo",
  			category: "info",
  			alias: ["binfo", "boti", "bi"],
  			cooldown: 3,
  			usage: `${process.env.prefix}botinfo`,
  			description: "Gives You Botinfo.",
		});
	}
	async run(client, message){

		let msgdefer = await client.functions.deferReply().message(message);
		let firstEmbed = await client.functions.botInfo("-", "-");

		return await msgdefer.edit({ content: ``, embeds: [firstEmbed.embed], components: [firstEmbed.buttonRow] }).then(async(msg) => {
			let secoundEmbed = await client.functions.botInfo(Math.floor(client.ws.ping), msg.createdTimestamp - message.createdTimestamp);
			msg.edit({ embeds: [secoundEmbed.embed] });
		})
	}
};