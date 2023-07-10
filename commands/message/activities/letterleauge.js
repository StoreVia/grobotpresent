const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessagePing extends Command {
	constructor(client) {
		super(client, {
			name: "letterleauge",
  			category: "activities",
  			alias: ["ll"],
  			cooldown: 3,
  			usage: `${process.env.prefix}letterleauge`,
  			description: "Use LetterLeauge Activity.",
		});
	}

	async run(client, message) {
		
        let voicechannelcheck = message.member.voice.channel;
        
        if(!voicechannelcheck){
            return message.reply({ content: `> Please Make Sure You Are In A Voice Channel.` })
        } else {
            client.functions.discordActivity(voicechannelcheck.id, `lettertile`).then(async (link) => {
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