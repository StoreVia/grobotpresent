const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageLandio extends Command {
	constructor(client) {
		super(client, {
			name: "landio",
  			category: "activities",
  			alias: ["lio"],
  			cooldown: 3,
  			usage: `${process.env.prefix}landio`,
  			description: "Use Land-io Activity.",
		});
	}
	async run(client, message) {
		
        let voicechannelcheck = await client.functions.voiceChannel().message(message);
        
        if(!voicechannelcheck){
            return message.reply({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            message.reply({ embeds: [await client.functions.embedBuild().ibfields(`RequestedBy`, `${voicechannelcheck}`, `VoiceChannel`, `${message.author}`).build()]})
            message.channel.send({content: `${await client.functions.discordActivity(voicechannelcheck.id, `landio`)}`})
        }
	}
};