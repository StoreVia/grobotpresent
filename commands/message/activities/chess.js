const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageChess extends Command {
	constructor(client) {
		super(client, {
			name: "chess",
  			category: "activities",
  			alias: ["cs"],
  			cooldown: 3,
  			usage: `${process.env.prefix}chess`,
  			description: "Use Chess Activity.",
		});
	}
	async run(client, message) {
		
        let voicechannelcheck = await client.functions.voiceChannel().message(message);
		let msgdefer = await client.functions.deferReply().message(message);
        
        if(!voicechannelcheck){
            return msgdefer.edit({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            return await msgdefer.edit({ content: `${await client.functions.discordActivity(voicechannelcheck.id, `chess`)}`})
        }
	}
};