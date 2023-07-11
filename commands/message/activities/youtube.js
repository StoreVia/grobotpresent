const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageYoutube extends Command {
	constructor(client) {
		super(client, {
			name: "youtube",
  			category: "activities",
  			alias: ["yt"],
  			cooldown: 3,
  			usage: `${process.env.prefix}youtube`,
  			description: "Use Youtube Activity.",
		});
	}
	async run(client, message) {
		
        let voicechannelcheck = client.functions.voiceChannel().message(message);
        
        if(!voicechannelcheck){
            return message.reply({ content: `> Please Make Sure You Are In A Voice Channel.` })
        } else {
            message.reply({ embeds: [client.functions.activityInfoEmbed(voicechannelcheck, message)] })
            message.channel.send({content: `${await client.functions.discordActivity(voicechannelcheck.id, `youtube`)}`})
        }
	}
};