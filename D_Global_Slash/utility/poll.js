const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('poll')
				.setDescription('Conduct A Poll.')
				.addStringOption(option => 
                    option.setName(`text1`)
                        .setDescription(`Enter First Choice In The Poll.`)
                        .setRequired(true))
                .addStringOption(option => 
                    option.setName(`text2`)
                        .setDescription(`Enter Second Choice In The Poll.`)
                        .setRequired(true)),
			usage: 'ping',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
        this.votedmember = new Set();
	}
	async run(client, interaction) {

        const choice1 = interaction.options.getString('text1');
        const choice2 = interaction.options.getString('text2');

		let Choice1Votes = 0;
		let Choice2Votes = 0;
		let ChoiceTotalVotes = 0;

        const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(`1️⃣`)
					.setCustomId('pchoice1')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
                    .setEmoji(`2️⃣`)
					.setCustomId('pchoice2')
					.setStyle(ButtonStyle.Secondary),
            )

        if(choice1.length > 100 || choice2.length> 100){
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp({ content: `> You Should Enter Sentence Which Is less Than 100 Characters.` })
        } else {
            let embed = new EmbedBuilder()
            .setTitle(`Poll`)
            .setDescription(`🅰: **${choice1}**\n\n🅱: **${choice2}**`)
            .setColor(`${process.env.ec}`)
            .setFooter({
                text: `${client.user.username} - ${process.env.year} ©`, 
                iconURL: process.env.iconurl
            })
            await interaction.deferReply()
            let message = await interaction.followUp({ embeds: [embed], components: [buttonRow] })

            const filter = i => i.customId;
		    const collector = message.createMessageComponentCollector({ filter, idle: 300000 });

            collector.on('collect', async i => {
                    if(i.customId === "pchoice1") {
                        Choice1Votes++;
                    } else if(i.customId === "pchoice2"){
                        Choice2Votes++
                    }
                    const Total = Choice1Votes + Choice2Votes;
                    const Percentage1 = (Choice1Votes / Total) * 100 || 0;
				    const Percentage2 = (Choice2Votes / Total) * 100 || 0;

                    embed.setFields(
                        { name: `**Choice1: **`, value:`> ${Math.floor(Percentage1)}%`, inline: true },
                        { name: `**Choice2: **`, value:`> ${Math.floor(Percentage2)}%`, inline: true },
                        { name: `**Total: **`, value:`> ${Total}`, inline: true }
                    )
                    await i.update({ embeds: [embed] })
                
            })
    
            collector.on('end', async (_, reason) => {
                if (reason === 'idle' || reason === 'user') {
                    buttonRow.components.map(component=> component.setDisabled(true));
                    return await interaction.editReply({ components: [buttonRow] });
                }
            });
        }

        

	}
};