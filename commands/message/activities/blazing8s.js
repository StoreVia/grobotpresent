const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageBlazing8s extends Command {
	constructor(client) {
		super(client, {
			name: "blazing8s",
  			category: "activities",
  			alias: ["b8", "b8s"],
  			cooldown: 3,
  			usage: `${process.env.prefix}blazing8s`,
  			description: "Use Blazing8s Activity.",
		});
	}
	async run(client, message) {

        let voicechannelcheck = await client.functions.voiceChannel().message(message);
        
        if(!voicechannelcheck){
            return message.reply({ content: `> Please Make Sure You Are In A Voice Channel.` })
        } else {
            message.reply({ embeds: [await client.functions.activityInfoEmbed(voicechannelcheck, message.author)] })
            return message.channel.send({content: `${await client.functions.discordActivity(voicechannelcheck.id, `blazing8`)}`})
        }
	}
};