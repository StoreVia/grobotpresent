const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Avatar extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('avatar')
				.setDescription(`Get User's Avatar.`)
				.addStringOption(option =>
					option.setName(`size`)
						.setDescription(`Select Size Of Avatar Url's`)
						.setRequired(true)
						.addChoices(
							{ name: `Small`, value: `small` },
							{ name: `Medium`, value: `medium` },
							{ name: `Lage`, value: `large` }
						))
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Who's Avatar.`)
                        .setRequired(false)),
			usage: 'avatar',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
		let result = await client.functions.getOptions(interaction).string(`size`);
		let size = result === "small" ? 1024 : result === "medium" ? 2048 : result === "large" ? 4096 : 4096;
		const UserOption = interaction.options.getUser('user') || interaction.user;
		let functions = await client.functions.avatar(UserOption, await size);

   	    return await interaction.followUp({ embeds: [functions.embed], components: [functions.buttonRow] })
	}
};