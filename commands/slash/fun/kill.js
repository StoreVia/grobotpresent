const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Kill extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('kill')
				.setDescription('Kill Someone.')
				.setDMPermission(true)
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Which User You Want To Kill.`)
                        .setRequired(true)),
			usage: 'kill',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    const target = interaction.options.getUser(`user`);
    const author = interaction.user;
    const sentence = await client.functions.kill(target, author);
      
    if(target === interaction.user){
      await interaction.deferReply({ ephemeral: true });
      return await interaction.followUp({ content: `> You Can't Kill Your Self.`});
    }else if(target.id === client.user.id){
      await interaction.deferReply({ ephemeral: true });
      interaction.followUp({ content: "> Why Are You Guys Trying To Kill Me." })
    } else if(target != interaction.user){
      await interaction.deferReply();
      return await interaction.followUp({ content: `${await sentence}` });
    }
	}
};