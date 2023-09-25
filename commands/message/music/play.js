const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessagePlay extends Command {
	constructor(client){
		super(client, {
			name: "play",
  			category: "music",
  			alias: ["ply"],
  			cooldown: 3,
  			usage: `${process.env.prefix}play <string>`,
  			description: "Play Music In Voice Channel.",
		});
	}
	async run(client, message, args){
		
        const query = args.join(" ");
		const clientVoice = message.guild.members.me.voice.channel;
        const memberVoice = await client.functions.voiceChannel().message(message);
		let msgdefer =  await client.functions.deferReply().message(message);

		if(clientVoice){
			if(clientVoice != memberVoice){
				return msgdefer.edit({ content: `> I Was Already In A Voice Channel, Join Now: ${clientVoice}.` })
			} else if(clientVoice === memberVoice){
				msgdefer.edit({ content: `🔍Searching...` })
				return await client.functions.play(memberVoice, query, message);
			}
		} else if(!memberVoice){
			return msgdefer.edit({ content: `> Please Join A Voice Channel.` })
		} else if(memberVoice){
			msgdefer.edit({ content: `🔍Searching...` })
			return await client.functions.play(memberVoice, query, message);
		}
	}
};