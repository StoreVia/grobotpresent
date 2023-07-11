const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessagePuttParty extends Command {
	constructor(client) {
		super(client, {
			name: "puttparty",
  			category: "activities",
  			alias: ["pp"],
  			cooldown: 3,
  			usage: `${process.env.prefix}puttparty`,
  			description: "Use PuttParty Activity.",
		});
	}
	async run(client, message) {
		
        let voicechannelcheck = client.functions.voiceChannel().message(message);
        
        if(!voicechannelcheck){
            return message.reply({ content: `> Please Make Sure You Are In A Voice Channel.` })
        } else {
            message.reply({ embeds: [client.functions.activityInfoEmbed(voicechannelcheck, message)] })
            message.channel.send({content: `${await client.functions.discordActivity(voicechannelcheck.id, `puttparty`)}`})
        }
	}
};