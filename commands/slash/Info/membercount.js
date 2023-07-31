const Command = require('../../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class MemberCount extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('membercount')
				.setDescription('Gives You Server Member Count.')
				.setDMPermission(true),
			usage: 'membercount',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();

		const guild = interaction.guild;
		const members = await guild.members.fetch();
		const botMembers = members.filter(member => member.user.bot);
		const realMembers = members.filter(member => !member.user.bot);

		let embed = new EmbedBuilder()
  			.setTitle(`Member Count - \`${interaction.guild.name}\``)
			.addFields(
				{ name: `**Members: **`, value: `\`${realMembers.size.toLocaleString()}\``, inline: true },
				{ name: `**Bots: **`, value: `\`${botMembers.size.toLocaleString()}\``, inline: true },
				{ name: `**Total: **`, value: `\`${members.size.toLocaleString()}\``, inline: true },
			)
  			.setColor(`${process.env.ec}`)
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
			})
		return await interaction.followUp({ embeds: [embed] });
	}
};