const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = class Dice extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('dice')
				.setDescription('Roll Dice.')
				.setDMPermission(true),
			usage: 'dice',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();

		const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Roll Again')
					.setCustomId('dice')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('distop')
                	.setDisabled(false)
					.setStyle(ButtonStyle.Danger),
            )
        const buttonRow1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Roll Again')
					.setCustomId('dice1')
					.setDisabled(true)
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('distop1')
                	.setDisabled(true)
					.setStyle(ButtonStyle.Danger),
            )

        const numbers = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
        ]
        const rolleddice = numbers[Math.floor(Math.random() * numbers.length)];

		const embed = new EmbedBuilder()
			.setDescription(`🎲 You Got \`${rolleddice}\``)
			.setColor(`${process.env.ec}`)
		let message = await interaction.followUp({ embeds: [embed], components: [buttonRow] })

		const filter = i => i.customId;
		const collector = message.createMessageComponentCollector({ filter, idle: 300000 });

        collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} 
			if(i.customId === "dice") {
				const rolleddice1 = numbers[Math.floor(Math.random() * numbers.length)];
				const embed = new EmbedBuilder()
					.setDescription(`🎲 You Got \`${rolleddice1}\``)
					.setColor(`${process.env.ec}`)
				i.update({ embeds: [embed], components: [buttonRow] })
			}
			if(i.customId === "distop"){
				return await i.update({ components: [buttonRow1] });
			}
		})

		collector.on('end', async (_, reason) => {
			if (reason === 'idle' || reason === 'user') {
				return await interaction.editReply({ components: [buttonRow1] });
			}
		});

	}
};