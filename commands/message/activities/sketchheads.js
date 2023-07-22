const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageSketchHeads extends Command {
	constructor(client) {
		super(client, {
			name: "sketchhedas",
  			category: "activities",
  			alias: ["sh", "skth"],
  			cooldown: 3,
  			usage: `${process.env.prefix}sketchhedas`,
  			description: "Use SketchHeads Activity.",
		});
	}
	async run(client, message) {
		
        let voicechannelcheck = await client.functions.voiceChannel().message(message);
        
        if(!voicechannelcheck){
            return message.reply({ content: `> Please Make Sure You Are In A Voice Channel.` })
        } else {
            message.reply({ embeds: [await client.functions.activityInfoEmbed(voicechannelcheck, message.author)] })
            message.channel.send({content: `${await client.functions.discordActivity(voicechannelcheck.id, `sketchheads`)}`})
        }
	}
};