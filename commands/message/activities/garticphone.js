const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessagePing extends Command {
	constructor(client) {
		super(client, {
			name: "garticphone",
  			category: "activities",
  			alias: ["gp"],
  			cooldown: 3,
  			usage: `${process.env.prefix}garticphone`,
  			description: "Use GarticPhone Activity.",
		});
	}

	async run(client, message) {
		
        let voicechannelcheck = message.member.voice.channel;
        
        if(!voicechannelcheck){
            return message.reply({ content: `> Please Make Sure You Are In A Voice Channel.` })
        } else {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, `garticphone`).then(async invite => {
                let embed = new EmbedBuilder()
                	.setColor(`${process.env.ec}`)
                	.addFields(
                    	{ name: `**RequestedBy: **`, value: `${message.author}`, inline: true },
                    	{ name: `\u200b`, value: `\u200b`, inline: true },
                    	{ name: `**VoiceChannel: **`, value: `${message.member.voice.channel}`, inline: true }
					)
                message.reply({ embeds: [embed] })
                message.channel.send({content: `${invite.code}`})
            })
        }
	}
};