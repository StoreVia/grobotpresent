const Command = require('../../../structures/Commands/MessageCommandClass');
const { useQueue } = require("discord-player")

module.exports = class MessageNowPlaying extends Command {
	constructor(client){
		super(client, {
			name: "nowplaying",
  			category: "music",
  			alias: ["nplying", "nply", "np"],
  			cooldown: 5,
  			usage: `${process.env.prefix}nowplaying`,
  			description: "Get Details About Current Playing Song.",
		});
	}
	async run(client, message){
	
		let msgdefer =  await client.functions.deferReply().message(message);
        const queue = useQueue(message.guild.id);
        
        if(!queue){
            return await msgdefer.edit({ content: `> There Is Nothing In Queue Now.` })
        } else if(queue){
			try {
            	return await msgdefer.edit({ content: ``, embeds: [await client.functions.nowPlaying(message)]})
			} catch(e){
				return await msgdefer.edit({ content: ``, embeds: [await client.functions.embedBuild().description(`Any Songs Aren't Playing Right Now. Please Try Again Later.`).build()]});
			}
        }
	}
};