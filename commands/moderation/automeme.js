const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = class Avatar extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('automeme')
				.setDescription(`Set Automeme Channel.`)
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addChannelOption(option => 
                    option.setName(`channel`)
                        .setDescription(`Select A Channel For Automeme.`)
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)),
			usage: 'automeme',
			category: 'moderation',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

        let channel = interaction.options.getChannel(`channel`);
		
	}
};