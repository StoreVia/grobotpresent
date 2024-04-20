const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, ButtonStyle } = require('discord.js');

module.exports = class Poll extends Command {
	constructor(client){
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
	}
	async run(client, interaction){

        const choice1 = await client.functions.getOptions(interaction).string(`text1`);
        const choice2 = await client.functions.getOptions(interaction).string(`text2`);
		const buttonRow = await client.functions.buttons(`1️⃣`, `pchoice1`, ButtonStyle.Secondary, `2️⃣`, `pchoice2`, ButtonStyle.Secondary);
        
        if(choice1.length > 100 || choice2.length> 100){
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp({ content: `> You Should Enter Sentence Which Is less Than 100 Characters.` })
        } else {
            await interaction.deferReply()
            let embed = await client.functions.embedBuild().title(`Poll Conducted By \`${interaction.user.username}\``).description(`🅰: **${choice1}**\n\n🅱: **${choice2}**\n\n> **PollEndsIn: **<t:${Math.floor((Date.now() + 300000)/1000)}:R>`).footer().build();
            
            let message = await interaction.followUp({ embeds: [embed], components: [buttonRow] })
            await client.functions.collector(message).poll(choice1, choice2, embed, buttonRow);
        }
	}
};