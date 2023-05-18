const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const dare = require(`../../A_Gro_db/dare.json`);

module.exports = class Dare extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('dare')
				.setDescription('Get A Random Dare.')
				.setDMPermission(true),
			usage: 'dare',
			category: 'truthordare',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		
		await interaction.deferReply();

        const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Dare')
					.setCustomId('dare')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('dastop')
					.setStyle(ButtonStyle.Danger),
            )

        const buttonRow1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Dare')
					.setCustomId('dare')
					.setDisabled(true)
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('dastop1')
					.setDisabled(true)
					.setStyle(ButtonStyle.Danger),
            )

		let embed = new EmbedBuilder()
  			.setTitle('Dare')
  			.setDescription(`${dare[Math.floor(Math.random() * dare.length)]}`)
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
    		})
        	.setColor(`${process.env.ec}`);
		const message = await interaction.followUp({ embeds: [embed], components: [buttonRow] });

        const filter = i => i.customId;
		const collector = message.createMessageComponentCollector({ filter, idle: 60000 });

        collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} else if(i.customId === "dare"){
                let embed = new EmbedBuilder()
                    .setTitle('Dare')
					.setDescription(`${dare[Math.floor(Math.random() * dare.length)]}`)
  					.setFooter({
      					text: `${client.user.username} - ${process.env.year} ©`, 
      					iconURL: process.env.iconurl
    				})
        			.setColor(`${process.env.ec}`);
				await i.update({ embeds: [embed], components: [buttonRow] });
			} else if(i.customId === "dastop"){
				await i.update({ components: [buttonRow1] });
			}
		})

		collector.on('end', async (_, reason) => {
			if (reason === 'idle' || reason === 'user') {
				return await interaction.editReply({ components: [buttonRow1] });
			}
		});
	}
};