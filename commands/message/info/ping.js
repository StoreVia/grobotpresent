const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessagePing extends Command {
	constructor(client){
		super(client, {
			name: "ping",
  			category: "info",
  			alias: ["stats"],
  			cooldown: 5,
  			usage: `${process.env.prefix}ping`,
  			description: "Gives You Bots Ping.",
		});
	}
	async run(client, message){

		message.reply({ embeds: [client.functions.pingEmbed("-", "-")] }).then((msg) =>  msg.edit({ embeds: [client.functions.pingEmbed(Math.floor(client.ws.ping), msg.createdTimestamp - message.createdTimestamp)] }));
	}
};