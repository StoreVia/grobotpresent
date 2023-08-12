const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionRoast extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('roast')
				.setDescription('Roast Someone.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`User You Want To Roast.`)
                        .setRequired(true)),
			usage: 'roast',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

        let target = await client.functions.getOptions(interaction).user(`user`);

        if(target.id === interaction.user.id){
            await interaction.deferReply({ ephemeral: true });
            interaction.followUp({ content: "> You Can't Roast Your Self." })
        } else if(target.id === client.user.id){
            await interaction.deferReply({ ephemeral: true });
            interaction.followUp({ content: "> Why Are You Guys Trying To Roast Me." })
        } else if(target){
            await interaction.deferReply();
            interaction.followUp({ content: `${target}, ${await client.functions.roast(target)}` })
        }
	}
};