const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageLetterLeauge extends Command {
	constructor(client) {
		super(client, {
			name: "letterleauge",
  			category: "activities",
  			alias: ["ll"],
  			cooldown: 3,
  			usage: `${process.env.prefix}letterleauge`,
  			description: "Use LetterLeauge Activity.",
		});
	}
	async run(client, message) {
		
        let voicechannelcheck = await client.functions.voiceChannel().message(message);
        
        if(!voicechannelcheck){
            return message.reply({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            message.reply({ embeds: [await client.functions.embedBuild().ibfields(`RequestedBy`, `${voicechannelcheck}`, `VoiceChannel`, `${message.author}`).build()]})
            message.channel.send({content: `${await client.functions.discordActivity(voicechannelcheck.id, `lettertile`)}`})
        }
	}
};