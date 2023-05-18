const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const tod = require(`../../A_Gro_db/tod.json`);
const fs = require('fs');

module.exports = class TruthOrDare extends Command {
	constructor(client) {
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
	async run(client, interaction) {
		
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

        const buttonRow1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('TOD')
					.setCustomId('tod1')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('todstop1')
					.setDisabled(true)
					.setStyle(ButtonStyle.Danger),
            )


		function readFileLines(filename) {
  			const content = fs.readFileSync(filename, 'utf-8');
  			const lines = content.split('\n').map(line => line.trim()).filter(line => line !== '');
  			return lines;
		}
		function pickRandomLine(lines) {
			const randomIndex = Math.floor(Math.random() * lines.length);
			return lines[randomIndex];
		}
		const truthFilePath = './A_Gro_db/truth.json';
		const dareFilePath = './A_Gro_db/dare.json';
		const truthLines = readFileLines(truthFilePath);
		const dareLines = readFileLines(dareFilePath);
		function pickRandomLineFromFile(filename) {
			const lines = readFileLines(filename);
			const randomLine = pickRandomLine(lines);
			return { file: filename, line: randomLine };
		}

		const randomLine = Math.random() < 0.5 ? pickRandomLineFromFile(truthFilePath) : pickRandomLineFromFile(dareFilePath);


		let embed = new EmbedBuilder()
  			.setTitle(`${randomLine.file}`)
  			.setDescription(`${randomLine.line}`)
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
    		})
        	.setColor(`${process.env.ec}`);
		let message = await interaction.followUp({ embeds: [embed], components: [buttonRow] });

        const filter = i => i.customId === 'nxttod';
		const collector = message.createMessageComponentCollector({ filter, idle: 60000 });

        collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} else if(i.customId === "tod"){
                let embed = new EmbedBuilder()
                    .setTitle('Truth Or Dare')
                    .setDescription(tod[Math.floor(Math.random() * tod.length)])
  					.setFooter({
      					text: `${client.user.username} - ${process.env.year} ©`, 
      					iconURL: process.env.iconurl
    				})
        			.setColor(`${process.env.ec}`);
				await i.update({ embeds: [embed], components: [buttonRow] });
			} else if(i.customId === "todstop"){
				await i.update({ embeds: [embed], components: [buttonRow1] });
			}
		})

		collector.on('end', async (_, reason) => {
			if (reason === 'idle' || reason === 'user') {
				return await interaction.editReply({ components: [buttonRow1] });
			}
		});
	}
};