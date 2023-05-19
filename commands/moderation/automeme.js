const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits, ChannelType } = require('discord.js');
const db = require(`quick.db`)

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

        if(channel){
            db.set(`automeme_${interaction.guild.id}`, channel.id)
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp({ content: `> Done✅. Updated Automeme Channel.\n\n**Note: **As Automeme Is In Beta Stage Meme Will Be Posted For Every 1 Hr.` })
        } else if(!channel){
            db.set(`automeme_${interaction.guild.id}`, channel.id)
            await interaction.deferReply({ ephemeral: true })
            return interaction.followUp({ content: `> Done✅. Automeme Channel Set.\n\n**Note: **As Automeme Is In Beta Stage Meme Will Be Posted For Every 1 Hr.` })
        }
	}
};