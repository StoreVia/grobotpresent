const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, EmbedBuilder, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require(`quick.db`);

module.exports = class ChatBot extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('chatbot')
				.setDescription('Set And Delete Chatbot.')
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommand(subcommand =>
                    subcommand.setName('set')
                        .setDescription('Set Chatbot Channel.')
                        .addChannelOption(option =>
                            option.setName('channel')
                                .setDescription('Select Channel')
                                .addChannelTypes(ChannelType.GuildText)
                                .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand.setName('delete')
                        .setDescription('Delete Chatbot Channel.')
                        .addChannelOption(option =>
                            option.setName('deletechannel')
                                .addChannelTypes(ChannelType.GuildText)
                                .setDescription('Select Channel')
                                .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand.setName('dashboard')
                            .setDescription('Get Chatbot Dashboard.')),
			usage: 'chatbot',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        let buttonRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(`Enable`)
                        .setStyle(ButtonStyle.Success)
                        .setCustomId(`chenable`),
                    new ButtonBuilder()
                        .setLabel(`Disabled`)
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`chdisable`),
                    new ButtonBuilder()
                        .setLabel(`Stop`)
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`chstop`),
                )

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
        return await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

        if (interaction.options.getSubcommand() === 'set') {
            const channel = interaction.options.getChannel('channel');            
            const checkchannel = db.fetch(`chatbot_${interaction.guild.id}`);
            if(!checkchannel){
                await interaction.deferReply({ ephemeral: true });
                db.set(`chatbot_${interaction.guild.id}`, channel.id);
                return await interaction.followUp({ content: `> Chatbot Was Now Bounded To ${channel}.`})
            }
            if(checkchannel){
                await interaction.deferReply({ ephemeral: true });
                db.set(`chatbot_${interaction.guild.id}`, channel.id);
                return await interaction.followUp({ content: `> Chatbot Was Now Updated To ${channel}.`})
            }   
        }
        if (interaction.options.getSubcommand() === 'delete') {
            const channel = interaction.options.getChannel('deletechannel');
            const checkchannel = db.fetch(`chatbot_${interaction.guild.id}`);
            if(!checkchannel){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> Chatbot Was Not Bounded To ${channel}.`})
            }
            if(checkchannel){
                await interaction.deferReply({ ephemeral: true });
                db.delete(`chatbot_${interaction.guild.id}`, channel.id);
                return await interaction.followUp({ content: `> Chatbot Was Now Deleted In ${channel}.`})
            }
        }
        if (interaction.options.getSubcommand() === 'dashboard') {
            const checkchannel = db.fetch(`chatbot_${interaction.guild.id}`);
            const checkdisable = db.fetch(`chatbotdisable_${interaction.guild.id}`);
            if(!checkchannel && !checkdisable){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> Dashboard Is Only Accessable When Chatbot Is Enabled.`})
            } else if(checkchannel && !checkdisable){
                await interaction.deferReply();
                let embed = new EmbedBuilder()
                    .setTitle(`Chatbot Dashboard`)
                    .setDescription(`**Control Chatbot With Buttons.**`)
                    .setColor(`${process.env.ec}`)
                    .setFooter({
                        text: `${client.user.username} - ${process.env.year} ©`, 
                        iconURL: process.env.iconurl
                    });
                buttonRow.components[0].setDisabled(true)
                const msg = await interaction.followUp({ embeds: [embed], components: [buttonRow]})
                dashCollector(msg);
            } else if(!checkchannel && checkdisable){
                await interaction.deferReply();
                let embed = new EmbedBuilder()
                    .setTitle(`Chatbot Dashboard`)
                    .setDescription(`**Control Chatbot With Buttons.**`)
                    .setColor(`${process.env.ec}`)
                    .setFooter({
                        text: `${client.user.username} - ${process.env.year} ©`, 
                        iconURL: process.env.iconurl
                    });
                buttonRow.components[1].setDisabled(true)
                const msg = await interaction.followUp({ embeds: [embed], components: [buttonRow]})
                dashCollector(msg);
            }
        }

        function dashCollector(msg){
            const filter = i => i.customId;
		    const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });

            collector.on('collect', async i => {
			    if (i.user.id != interaction.user.id) {
				    await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			    } else if(i.customId === "chenable") {
                    db.set(`chatbot_${interaction.guild.id}`, checkchannel)
                    db.delete(`chatbotdisable_${interaction.guild.id}`);
                    buttonRow.components[0].setDisabled(true)
                    await i.update({ components: [buttonRow]})
                } else if(i.customId === "chdisable"){
                    db.set(`chatbotdisable_${interaction.guild.id}`);
                    db.delete(`chatbot_${interaction.guild.id}`, checkchannel);
                    buttonRow.components[1].setDisabled(true)
                    await i.update({ components: [buttonRow]})
                } else if(i.customId === "chstop"){
                    buttonRow.components.map(component=> component.setDisabled(true));
                    await i.update({ components: [buttonRow]})
                }
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