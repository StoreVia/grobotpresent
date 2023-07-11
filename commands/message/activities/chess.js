const { EmbedBuilder } = require('discord.js');
const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageChess extends Command {
	constructor(client) {
		super(client, {
			name: "chess",
  			category: "activities",
  			alias: ["cs"],
  			cooldown: 3,
  			usage: `${process.env.prefix}chess`,
  			description: "Use Chess Activity.",
		});
	}

	async run(client, message) {
		
        let voicechannelcheck = message.member.voice.channel;
        
        if(!voicechannelcheck){
            return message.reply({ content: `> Please Make Sure You Are In A Voice Channel.` })
        } else {
            client.functions.discordActivity(voicechannelcheck.id, `chess`).then(async (link) => {
                let embed = new EmbedBuilder()
                	.setColor(`${process.env.ec}`)
                	.addFields(
                    	{ name: `**RequestedBy: **`, value: `${message.author}`, inline: true },
                    	{ name: `\u200b`, value: `\u200b`, inline: true },
                    	{ name: `**VoiceChannel: **`, value: `${voicechannelcheck}`, inline: true }
					)
                message.reply({ embeds: [embed] })
                message.channel.send({content: `${link}`})
            })
        }
	}
};