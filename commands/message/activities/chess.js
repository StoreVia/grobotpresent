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
        
        if(!voicechannelcheck){
            return message.reply({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            message.reply({ embeds: [await client.functions.embedBuild().ibfields(`RequestedBy`, `${voicechannelcheck}`, `VoiceChannel`, `${message.author}`).build()]})
            message.channel.send({content: `${await client.functions.discordActivity(voicechannelcheck.id, `chess`)}`})
        }
	}
};