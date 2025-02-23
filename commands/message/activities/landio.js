const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageLandio extends Command {
	constructor(client){
		super(client, {
			name: "landio",
  			category: "activities",
  			alias: ["lio"],
  			cooldown: 5,
  			usage: `${process.env.prefix}landio`,
  			description: "Use Land-io Activity.",
		});
	}
	async run(client, message){
		
        let voicechannelcheck = await client.functions.voiceChannel().message(message);
		let msgdefer = await client.functions.deferReply().message(message);
        
        if(!voicechannelcheck){
            return msgdefer.edit({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            return await msgdefer.edit({ content: `${await client.functions.discordActivity(voicechannelcheck.id, `landio`)}`})
        }
	}
};