const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageCovid extends Command {
	constructor(client){
		super(client, {
			name: "covid",
  			category: "utility",
  			alias: ["cvid", "cvd"],
  			cooldown: 5,
  			usage: `${process.env.prefix}wikipedia`,
  			description: "Get Covid-19 Stats Around The World.",
		});
	}
	async run(client, message){
		
		let msgdefer = await client.functions.deferReply().message(message);
        let embed = await client.functions.covid();

		return await msgdefer.edit({ content: ``, embeds: [embed.embedUpdate] });
	}
};