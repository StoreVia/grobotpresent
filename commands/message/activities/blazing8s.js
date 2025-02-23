const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageBlazing8s extends Command {
	constructor(client){
		super(client, {
			name: "blazing8s",
  			category: "activities",
  			alias: ["b8", "b8s"],
  			cooldown: 5,
  			usage: `${process.env.prefix}blazing8s`,
  			description: "Use Blazing8s Activity.",
		});
	}
	async run(client, message){

        let voicechannelcheck = await client.functions.voiceChannel().message(message);
		let msgdefer = await client.functions.deferReply().message(message);
        
        if(!voicechannelcheck){
            return msgdefer.edit({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            return await msgdefer.edit({ content: `${await client.functions.discordActivity(voicechannelcheck.id, `blazing8`)}`})
        }
	}
};