const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const version = require(`../../package.json`).version;

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

		const buttonRow = new ActionRowBuilder()
			.addComponents(
                new ButtonBuilder()
					.setLabel('Website')
					.setStyle(ButtonStyle.Link)
					.setURL(`https://grobot.store`),
                new ButtonBuilder()
					.setLabel('Invite')
					.setStyle(ButtonStyle.Link)
					.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`),
				new ButtonBuilder()
					.setLabel('Top.gg')
					.setStyle(ButtonStyle.Link)
					.setURL(`https://top.gg/bot/${client.user.id}`),
			);

        const embed = new EmbedBuilder()
            .setTitle(`🤖 Bot Info - \`${client.user.username}\``)
			.setDescription(`**Please Support Us By Voting On Top.gg**`)
            .setThumbnail(`${process.env.iconurl}`)
            .addFields(
                { name: '**✉️ InviteMe : **', value: `> [inviteMe](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`, inline: true },
                { name: '**🟢 Api: **', value: `> ┕\`${Math.round(client.ws.ping)}ms\``, inline: true },
				{ name: '**🏓 Latency: **', value: `> ┕\`0ms\``, inline: true },
            	{ name: '**🏠 Guilds: **', value: `> ${client.guilds.cache.size}`,inline: true },
             	{ name: '**👥 Users: **', value: `> ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`, inline: true },
            	{ name: '**🤖 TotalCmds: **', value: `> ${process.env.commands_count} Cmds`, inline: true },
				{ name: '**🤖 Version: **', value: `\`\`\`> v${version}\`\`\``,inline: true },
            )
            .setColor(`${process.env.ec}`)
            .setFooter({
            	text: `${client.user.username} - ${process.env.year} ©`, 
            	iconURL: process.env.iconurl
          	});
		interaction.followUp({ embeds: [embed], components: [buttonRow] }).then((msg) =>  {
			const embed = new EmbedBuilder()
            	.setTitle(`🤖 Bot Info - \`${client.user.username}\``)
				.setDescription(`**Please Support Us By Voting On Top.gg**`)
            	.setThumbnail(`${process.env.iconurl}`)
            	.addFields(
                	{ name: '**✉️ InviteMe : **', value: `> [inviteMe](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`, inline: true },
                	{ name: '**🟢 Api: **', value: `> \`${Math.round(client.ws.ping)} ms\``, inline: true },
					{ name: '**🏓 Latency: **', value: `> \`${msg.createdTimestamp - interaction.createdTimestamp} ms\``, inline: true },
            		{ name: '**🏠 Guilds: **', value: `> ${client.guilds.cache.size}`,inline: true },
             		{ name: '**👥 Users: **', value: `> ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`, inline: true },
            		{ name: '**🤖 TotalCmds: **', value: `> ${process.env.commands_count} Cmds`, inline: true },
					{ name: '**🤖 Version: **', value: `\`\`\`> v${version}\`\`\``,inline: true },
            	)
            	.setColor(`${process.env.ec}`)
            	.setFooter({
            		text: `${client.user.username} - ${process.env.year} ©`, 
            		iconURL: process.env.iconurl
          		});
			msg.edit({ embeds: [embed] })
		})
	}
};