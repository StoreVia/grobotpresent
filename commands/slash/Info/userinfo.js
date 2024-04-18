const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Userinfo extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('userinfo')
				.setDescription('Gives You Userinfo.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Who's Userinfo.`)
                        .setRequired(false)),
			usage: 'userinfo',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
		
        let functions = await client.functions.userInfo(interaction, true);

		await interaction.deferReply();
        return await interaction.followUp({ content: `${await functions.content}`, embeds: [await functions.embed] })
	}
};