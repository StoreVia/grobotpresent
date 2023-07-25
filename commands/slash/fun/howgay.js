const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionHowGay extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('howgay')
				.setDescription('Gay Calculator(Fun).')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Check Any User's Gay Percententage.`)
                        .setRequired(true)),
			usage: 'howgay',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const user = await client.functions.getOptions(interaction).user('user');
        let gaypercentage = await client.functions.randomNum(100).whole();

        if(user.id === client.user.id){
            await interaction.deferReply({ ephemeral: true });
            return await interaction.followUp({ content: "> I'm Not Going To Tell You That 😉." })
        } else if(user){
            await interaction.deferReply();
            return await interaction.followUp({embeds: [await client.functions.embedBuild().description(`${user} Is ${gaypercentage}% Gay`).build()]})
        }
	}
};