const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageSpellCast extends Command {
	constructor(client){
		super(client, {
			name: "spellcast",
  			category: "activities",
  			alias: ["sc"],
  			cooldown: 3,
  			usage: `${process.env.prefix}spellcast`,
  			description: "Use SpellCast Activity.",
		});
	}
	async run(client, message){
		
        let voicechannelcheck = await client.functions.voiceChannel().message(message);
		let msgdefer = await client.functions.deferReply().message(message);
        
        if(!voicechannelcheck){
            return msgdefer.edit({ content: `${await client.functions.errorMsg().vc()}` })
        } else {
            return await msgdefer.edit({ content: `${await client.functions.discordActivity(voicechannelcheck.id, `spellcast`)}`})
        }
	}
};