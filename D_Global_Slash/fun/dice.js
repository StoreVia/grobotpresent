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

		let message = await interaction.followUp({ embeds: [embed(dice())], components: [buttonRow] })

		const filter = i => i.customId;
		const collector = message.createMessageComponentCollector({ filter, idle: 300000 });

        collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} 
			if(i.customId === "dice") {
				i.update({ embeds: [embed(dice())], components: [buttonRow] })
			}
			if(i.customId === "distop"){
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
		
//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////
		function embed(num){
			const embed = new EmbedBuilder()
				.setDescription(`🎲 You Got \`${num}\``)
				.setColor(`${process.env.ec}`)
			return embed;
		}
		function dice(){
			const numbers = [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6"
			]
			const rolleddice = numbers[Math.floor(Math.random() * numbers.length)];
			return rolleddice;
		}
//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////
	}
};