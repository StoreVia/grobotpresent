const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageJoin extends Command {
	constructor(client){
		super(client, {
			name: "join",
  			category: "music",
  			alias: ["jin", "jon"],
  			cooldown: 5,
  			usage: `${process.env.prefix}join <channelMention>`,
  			description: "Make Bot To Join In Voice Channel.",
		});
	}
	async run(client, message){

		const clientVoice = message.guild.members.me.voice.channel;
        const memberVoice = await client.functions.voiceChannel().message(message);
		let msgdefer =  await client.functions.deferReply().message(message);

		if(clientVoice){
			if(clientVoice != memberVoice){
				return msgdefer.edit({ content: `> I Was Already In A Voice Channel, Join Now: ${clientVoice}.` })
			} else if(clientVoice === memberVoice){
				return msgdefer.edit({ content: `> I Was Already In Your Voice Channel.` })
            }
		} else if(!memberVoice){
			return msgdefer.edit({ content: `> Please Join A Voice Channel.` })
        } else if(!clientVoice){
			await client.functions.joinVc(memberVoice);
			return msgdefer.edit({ content: `> Joined.` })   
        }
	}
};