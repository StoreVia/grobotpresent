const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const truth = require(`../../A_Gro_db/truth.json`);

module.exports = class Truth extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('truth')
				.setDescription('Get A Random Truth.')
				.setDMPermission(true),
			usage: 'truth',
			category: 'truthordare',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();

        const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Truth')
					.setCustomId('truth')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('trstop')
					.setStyle(ButtonStyle.Danger),
            )

        const buttonRow1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Truth')
					.setCustomId('truth1')
					.setDisabled(true)
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('trstop1')
					.setDisabled(true)
					.setStyle(ButtonStyle.Danger),
            )

		let embed = new EmbedBuilder()
  			.setTitle('Truth')
			.setDescription(`${truth[Math.floor(Math.random() * truth.length)]}`)
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
    		})
        	.setColor(`${process.env.ec}`);
		let message = await interaction.followUp({ embeds: [embed], components: [buttonRow] });

        const filter = i => i.customId;
		const collector = message.createMessageComponentCollector({ filter, idle: 60000 });

        collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} else if(i.customId === "truth") {
                let embed = new EmbedBuilder()
                    .setTitle('Truth')
                    .setDescription(`${truth[Math.floor(Math.random() * truth.length)]}`)
  					.setFooter({
      					text: `${client.user.username} - ${process.env.year} ©`, 
      					iconURL: process.env.iconurl
    				})
        			.setColor(`${process.env.ec}`);
				await i.update({ embeds: [embed], components: [buttonRow] });
			} else if(i.customId === "trstop"){
				buttonRow.components.map(component=> component.setDisabled(true));
				await i.update({ components: [buttonRow] });
			}
		})

		collector.on('end', async (_, reason) => {
			if (reason === 'idle' || reason === 'user') {
				buttonRow.components.map(component=> component.setDisabled(true));
				await interaction.editReply({ components: [buttonRow] });
			}
		});
	}
};