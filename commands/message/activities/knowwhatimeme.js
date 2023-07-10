const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessagePing extends Command {
	constructor(client) {
		super(client, {
			name: "knowwhatimeme",
  			category: "activities",
  			alias: ["kwim"],
  			cooldown: 3,
  			usage: `${process.env.prefix}jamspace`,
  			description: "Use KnowWhatIMeme Activity.",
		});
	}

	async run(client, message) {
		
        let voicechannelcheck = message.member.voice.channel;
        
        if(!voicechannelcheck){
            return message.reply({ content: `> Please Make Sure You Are In A Voice Channel.` })
        } else {
            client.functions.discordActivity(voicechannelcheck.id, `kwim`).then(async (link) => {
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