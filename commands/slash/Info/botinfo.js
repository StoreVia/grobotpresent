const Command = require('../../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const version = require(`../../../package.json`).version;

module.exports = class Botinfo extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('botinfo')
				.setDescription('Gives You Botinfo.')
				.setDMPermission(true),
			usage: 'botinfo',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		await interaction.deferReply();

		const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
		];

		const buttonRow = new ActionRowBuilder()
			.addComponents(
                new ButtonBuilder()
					.setLabel('Website')
					.setStyle(ButtonStyle.Link)
					.setURL(`${process.env.website}`),
                new ButtonBuilder()
					.setLabel('Invite')
					.setStyle(ButtonStyle.Link)
					.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`),
				new ButtonBuilder()
					.setLabel('Top.gg')
					.setStyle(ButtonStyle.Link)
					.setURL(`https://top.gg/bot/${client.user.id}`),
			);

		let msg = await interaction.followUp({ embeds: [embed("-", "-", "-", "-")], components: [buttonRow] })
		
		Promise.all(promises)
		.then(results => {
			msg.edit({ embeds: [embed(Math.floor(client.ws.ping), msg.createdTimestamp - interaction.createdTimestamp, results[0].reduce((acc, guildCount) => acc + guildCount, 0), results[1].reduce((acc, memberCount) => acc + memberCount, 0))]})
		})
		function embed(api, latency, guilds, users){
			const embed = new EmbedBuilder()
            .setTitle(`🤖 Bot Info - \`${client.user.username}\``)
			.setDescription(`**Please Support Us By Voting On Top.gg**`)
            .setThumbnail(`${process.env.iconurl}`)
            .addFields(
                { name: '**✉️ InviteMe : **', value: `> [InviteMe](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`, inline: true },
                { name: '**🟢 Api: **', value: `> ┕\`${api} ms\``, inline: true },
				{ name: '**🏓 Latency: **', value: `> ┕\`${latency} ms\``, inline: true },
            	{ name: '**🏠 Guilds: **', value: `> ${guilds}`,inline: true },
             	{ name: '**👥 Users: **', value: `> ${users}`, inline: true },
            	{ name: '**🤖 TotalCmds: **', value: `> ${process.env.commands_count} Cmds`, inline: true },
				{ name: '**🤖 Version: **', value: `\`\`\`> v${version}\`\`\``,inline: true },
            )
            .setColor(`${process.env.ec}`)
            .setFooter({
            	text: `${client.user.username} - ${process.env.year} ©`, 
            	iconURL: process.env.iconurl
          	});
			return embed;
		}

	}
};