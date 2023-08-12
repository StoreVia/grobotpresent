const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageGarticPhone extends Command {
	constructor(client){
		super(client, {
			name: "garticphone",
  			category: "activities",
  			alias: ["gp"],
  			cooldown: 3,
  			usage: `${process.env.prefix}garticphone`,
  			description: "Use GarticPhone Activity.",
		});
	}
	async run(client, message){
		
        let voicechannelcheck = await client.functions.voiceChannel().message(message);
		let msgdefer = await client.functions.deferReply().message(message);
        
        if(!voicechannelcheck){
            return msgdefer.edit({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            return await msgdefer.edit({ content: `${await client.functions.discordActivity(voicechannelcheck.id, `garticphone`)}`})
        }
	}
};