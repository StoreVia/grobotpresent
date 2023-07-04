const Command = require('../../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = class Avatar extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('avatar')
				.setDescription(`Get Any User's Avatar.`)
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
	async run(client, interaction) {

		await interaction.deferReply();
		let result = interaction.options.getString(`size`)
		let size = 0;
		if(result === "small") size = 1024;
		if(result === "medium") size = 2048;
		if(result === "large") size = 4096;
		const UserOption = interaction.options.getUser('user') || interaction.user;

		const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('PNG')
					.setURL(`${UserOption.displayAvatarURL({ size: size, dynamic: true, extension: "png" })}`)
					.setStyle(ButtonStyle.Link),
				new ButtonBuilder()
					.setLabel('JPG')
					.setURL(`${UserOption.displayAvatarURL({ size: size, dynamic: true, extension: "jpg" })}`)
					.setStyle(ButtonStyle.Link),
				new ButtonBuilder()
					.setLabel('WEBP')
					.setURL(`${UserOption.displayAvatarURL({ size: size, dynamic: true, extension: "webp" })}`)
					.setStyle(ButtonStyle.Link),
            )

    	const userEmbed = new EmbedBuilder()
    		.setTitle(`${UserOption.username}'s Avatar`)
        	.setDescription(`> Click One Of The Formats You Like.\n> PNG(Recommended)123`)
        	.setImage(UserOption.displayAvatarURL({ size: 4096, dynamic: true, extension: "png" }))
        	.setColor(`${process.env.ec}`)
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
			});
   	    return await interaction.followUp({ embeds: [userEmbed], components: [buttonRow] })
	}
};