const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageYoutube extends Command {
	constructor(client){
		super(client, {
			name: "youtube",
  			category: "activities",
  			alias: ["yt"],
  			cooldown: 5,
  			usage: `${process.env.prefix}youtube`,
  			description: "Use Youtube Activity.",
		});
	}
	async run(client, message){
		
        let voicechannelcheck = await client.functions.voiceChannel().message(message);

		let msgdefer = await client.functions.deferReply().message(message);
        
        if(!voicechannelcheck){
            return msgdefer.edit({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            
            return await msgdefer.edit({ content: `${await client.functions.discordActivity(voicechannelcheck.id, `youtube`)}`})
        }
	}
};