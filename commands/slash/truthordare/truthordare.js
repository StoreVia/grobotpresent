const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = class TruthOrDare extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('truthordare')
				.setDescription('Get A Random Truth Or Dare.')
				.setDMPermission(true),
			usage: 'truthordare',
			category: 'truthordare',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
		
		await interaction.deferReply();

        const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('TOD')
					.setCustomId('tod')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('todstop')
					.setStyle(ButtonStyle.Danger),
            )

		function readFileLines(filename){
  			const content = fs.readFileSync(filename, 'utf-8');
			const lines = content.split('\n').map(line => line.trim().replace(/,+$/, '')).filter(line => line !== '');
  			return lines;
		}
		function pickRandomLine(lines){
			const randomIndex = Math.floor(Math.random() * lines.length);
			return lines[randomIndex];
		}
		
		const truthFilePath = './A_Gro_db/truth.json';
		const dareFilePath = './A_Gro_db/dare.json';
		const truthLines = readFileLines(truthFilePath);
		const dareLines = readFileLines(dareFilePath);

		function pickRandomLineFromFile(filename){
			const lines = readFileLines(filename);
			const randomLine = pickRandomLine(lines);
			return { file: filename, line: randomLine };
		}

		const randomLine = Math.random() < 0.5 ? pickRandomLineFromFile(truthFilePath) : pickRandomLineFromFile(dareFilePath);
		
		let fileName = null;
		if(randomLine.file.includes(`dare`)) fileName = "Dare";
		if(randomLine.file.includes(`truth`)) fileName = "Truth";

		let embed = new EmbedBuilder()
  			.setTitle(`${fileName}`)
  			.setDescription(`${randomLine.line.replace(/"/g, "").trim()}`)
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
    		})
        	.setColor(`${process.env.ec}`);
		let message = await interaction.followUp({ embeds: [embed], components: [buttonRow] });

        const filter = i => i.customId;
		const collector = message.createMessageComponentCollector({ filter, idle: 60000 });

        collector.on('collect', async i => {
			if(i.user.id != interaction.user.id){
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} else if(i.customId === "tod"){
				const randomLine1 = Math.random() < 0.5 ? pickRandomLineFromFile(truthFilePath) : pickRandomLineFromFile(dareFilePath);
				let fileName1 = null;
				if(randomLine1.file.includes(`dare`)) fileName1 = "Dare";
				if(randomLine1.file.includes(`truth`)) fileName1 = "Truth";
                let embed = new EmbedBuilder()
  					.setTitle(`${fileName1}`)
  					.setDescription(`${randomLine1.line.replace(/"/g, "").trim()}`)
  					.setFooter({
						text: `${client.user.username} - ${process.env.year} ©`, 
						iconURL: process.env.iconurl
					})
					.setColor(`${process.env.ec}`);
				await i.update({ embeds: [embed], components: [buttonRow] });
			} else if(i.customId === "todstop"){
				buttonRow.components.map(component=> component.setDisabled(true));
				await i.update({ components: [buttonRow] });
			}
		})

		collector.on('end', async (_, reason) => {
			if(reason === 'idle' || reason === 'user'){
				buttonRow.components.map(component=> component.setDisabled(true));
				await interaction.editReply({ components: [buttonRow] });
			}
		});
	}
};