const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessagePing extends Command {
	constructor(client) {
		super(client, {
			name: "wikipedia",
  			category: "utility",
  			alias: ["wiki", "wp"],
  			cooldown: 3,
  			usage: `${process.env.prefix}wikipedia`,
  			description: "Search Something In Wikipedia.",
		});
	}

	async run(client, message, args) {
		
		const query = args.join(" ");
		
		if(!query){
			message.reply(`Enter Some Query To Search In Wikipedia.`)
		} else {
			fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
			.then((res) => res.json())
			.then(async (data) => {
				if(data.type === "disambiguation"){
					try{
						const embed = new EmbedBuilder()
							.setTitle(`${data.title}`)
							.setURL(`${data.content_urls.desktop.page}`)
							.setDescription(`${data.extract}\n\n> Link For This Topic : [Click Me!](${data.content_urls.desktop.page})`)
							.setColor(`${process.env.ec}`)
							.setThumbnail(`https://cdn.discordapp.com/attachments/1042676003291533365/1060592246900142190/Wikipedia-logo-transparent.png`)
							.setFooter({
								text: `${client.user.username} - ${process.env.year} ©`,
								iconURL: process.env.iconurl
							});
						await message.reply({ embeds: [embed] })
					} catch(e) {
						await message.reply({ content: `> No Query Found For \`${query}\`` })
					}
				} else {
					try{
						const embed = new EmbedBuilder()
							.setTitle(`${data.title}`)
							.setURL(`${data.content_urls.desktop.page}`)
							.setDescription(`${data.extract}`)
							.setColor(`${process.env.ec}`)
							.setThumbnail(`https://cdn.discordapp.com/attachments/1042676003291533365/1060592246900142190/Wikipedia-logo-transparent.png`)
							.setFooter({
								text: `${client.user.username} - ${process.env.year} ©`,
								iconURL: process.env.iconurl
							});
						await message.reply({ embeds: [embed] })
					} catch(e) {
						await message.reply({ content: `> No Query Found For \`${query}\`` })
					}
				}
			})
		}
	}
};