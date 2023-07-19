const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessagePokerNight extends Command {
	constructor(client) {
		super(client, {
			name: "pokernight",
  			category: "activities",
  			alias: ["pn"],
  			cooldown: 3,
  			usage: `${process.env.prefix}pokernight`,
  			description: "Use PokerNight Activity.",
		});
	}
	async run(client, message) {
		
        let voicechannelcheck = client.functions.voiceChannel().message(message);
        
        if(!voicechannelcheck){
            return message.reply({ content: `> Please Make Sure You Are In A Voice Channel.` })
        } else {
            message.reply({ embeds: [client.functions.activityInfoEmbed(voicechannelcheck, message.author)] })
            message.channel.send({content: `${await client.functions.discordActivity(voicechannelcheck.id, `poker`)}`})
        }
	}
};