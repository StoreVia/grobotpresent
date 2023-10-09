const Command = require('../../../structures/Commands/MessageCommandClass');
const { useQueue } = require("discord-player")

module.exports = class MessageLyrics extends Command {
	constructor(client){
		super(client, {
			name: "lyrics",
  			category: "music",
  			alias: ["lyrcs", "lyrs", "lycs", "lys"],
  			cooldown: 5,
  			usage: `${process.env.prefix}lyrics`,
  			description: "Get Lyrics Of Currently Playing Song.",
		});
	}
	async run(client, message){
	
		let msgdefer =  await client.functions.deferReply().message(message);
        const queue = useQueue(message.guild.id);
        
        if(!queue){
            return await msgdefer.edit({ content: `> There Is Nothing In Queue Now.` })
        } else if(queue){
			try {
            	return await msgdefer.edit({ embeds: [await client.functions.lyrics(interaction)]});
			} catch(e){
				return await msgdefer.edit({ embeds: [await client.functions.embedBuild().description(`Lyrics Not Found. If You Think This A Bug Report By Using "/report" Command.`).build()]});
			}
        }
	}
};