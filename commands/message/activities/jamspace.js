const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageJamSpace extends Command {
	constructor(client) {
		super(client, {
			name: "jamspace",
  			category: "activities",
  			alias: ["js"],
  			cooldown: 3,
  			usage: `${process.env.prefix}jamspace`,
  			description: "Use JamSpace Activity.",
		});
	}
	async run(client, message) {
		
        let voicechannelcheck = client.functions.voiceChannel().message(message);
        
        if(!voicechannelcheck){
            return message.reply({ content: `> Please Make Sure You Are In A Voice Channel.` })
        } else {
            message.reply({ embeds: [client.functions.activityInfoEmbed(voicechannelcheck, message.author)] })
            message.channel.send({content: `${await client.functions.discordActivity(voicechannelcheck.id, `jamspace`)}`})
        }
	}
};