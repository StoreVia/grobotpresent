const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageLetterLeauge extends Command {
	constructor(client){
		super(client, {
			name: "letterleauge",
  			category: "activities",
  			alias: ["ll"],
  			cooldown: 3,
  			usage: `${process.env.prefix}letterleauge`,
  			description: "Use LetterLeauge Activity.",
		});
	}
	async run(client, message){
		
        let voicechannelcheck = await client.functions.voiceChannel().message(message);
		let msgdefer = await client.functions.deferReply().message(message);
        
        if(!voicechannelcheck){
            return msgdefer.edit({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            return await msgdefer.edit({ content: `${await client.functions.discordActivity(voicechannelcheck.id, `lettertile`)}`})
        }
	}
};