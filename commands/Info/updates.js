const Command = require('../../structures/CommandClass');
const db = require(`quick.db`);
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Updates extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('updates')
				.setDescription('Get Latest Updates Everyday.')
				.setDMPermission(true),
			usage: 'updates',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const updateget = await client.db.get(`update`);
		let updatetext = null;
		let id = null;
		if(!updateget) updatetext = "None"
		if(updateget) [updatetext, id] = updateget[0].textandid.split(',')
		 

		await interaction.deferReply();
		let embed = new EmbedBuilder()
            .setTitle(`Updates`)
            .setDescription(`\`\`\`${updatetext}\`\`\``)
			.setColor(`${process.env.ec}`)
            .setFooter({
                text: `${client.user.username} - ${process.env.year} ©`,
                iconURL: process.env.iconurl
            });
		interaction.followUp({ embeds: [embed] })
	}
};