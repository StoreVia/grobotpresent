const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageBubbleLeauge extends Command {
	constructor(client){
		super(client, {
			name: "bobbleleauge",
  			category: "activities",
  			alias: ["bl"],
  			cooldown: 5,
  			usage: `${process.env.prefix}bobbleleauge`,
  			description: "Use BobbleLeauge Activity.",
		});
	}
	async run(client, message){
		
        let voicechannelcheck = await client.functions.voiceChannel().message(message);
		let msgdefer = await client.functions.deferReply().message(message);
        
        if(!voicechannelcheck){
            return msgdefer.edit({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            return await msgdefer.edit({ content: `${await client.functions.discordActivity(voicechannelcheck.id, `bobble`)}`})
        }
	}
};