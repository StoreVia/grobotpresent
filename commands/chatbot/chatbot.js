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

        let subcommand = interaction.options.getSubcommand();

///////////////////////////////////////////////{Dash_Buttons}//////////////////////////////////////////////////

        let buttonRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(`Enable`)
                        .setStyle(ButtonStyle.Success)
                        .setCustomId(`chenable`),
                    new ButtonBuilder()
                        .setLabel(`Disable`)
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`chdisable`),
                    new ButtonBuilder()
                        .setLabel(`Stop`)
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`chstop`),
                )

///////////////////////////////////////////////{Dash_Buttons}//////////////////////////////////////////////////

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            return await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'set') {
            const channel1 = channel('channel');            
            const checkchannel = db.fetch(`chatbot_${interaction.guild.id}`);
            if(!checkchannel){
                await interaction.deferReply({ ephemeral: true });
                db.set(`chatbot_${interaction.guild.id}`, channel1.id);
                return await interaction.followUp({ content: `> Chatbot Was Now Bounded To ${channel1}.`})
            } else if(channel1.id === checkchannel){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> Chatbot Was Already Linked To ${channel1}.`})
            } else if(channel1.id != checkchannel){
                await interaction.deferReply({ ephemeral: true });
                db.set(`chatbot_${interaction.guild.id}`, channel1.id);
                return await interaction.followUp({ content: `> Chatbot Was Now Updated To ${channel1}.`})
            }   
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === 'delete'){
            const checkchannel = db.fetch(`chatbot_${interaction.guild.id}`);
            if(!checkchannel){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> Chatbot Was Not Bounded To Any Channel.`})
            } else if(checkchannel){
                await interaction.deferReply({ ephemeral: true });
                db.delete(`chatbot_${interaction.guild.id}`, channel.id);
                return await interaction.followUp({ content: `> Chatbot Was Now Deleted In ${channel}.`})
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === 'dashboard') {
            const checkchannel = db.fetch(`chatbot_${interaction.guild.id}`);
            const checkdisable = db.fetch(`chatbotdisable_${interaction.guild.id}`);
            if(!checkchannel){
                if(!checkdisable){
                    await interaction.deferReply({ ephemeral: true });
                    return await interaction.followUp({ content: `> Dashboard Is Only Accessable When Chatbot Is Enabled.`})
                } else if(checkdisable){
                    await interaction.deferReply();
                    buttonRow.components[1].setDisabled(true)
                    const msg = await interaction.followUp({ embeds: [embed("Disabled", `<#${checkdisable}>`)], components: [buttonRow]})
                    dashCollector(msg);
                }
            } else if(checkchannel){
                await interaction.deferReply();
                buttonRow.components[0].setDisabled(true)
                const msg = await interaction.followUp({ embeds: [embed(`Enabled`, `<#${checkchannel}>`)], components: [buttonRow]})
                dashCollector(msg);
            }
        }

        
//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////

        function string(text){
            let stringInput = interaction.options.getString(text);
            stringInput;
        }
        function user(usr){
            let usrInput = interaction.options.getUser(usr);
            return usrInput;
        }
        function channel(chl){
            let chlInput = interaction.options.getChannel(chl);
            return chlInput;
        }
        function integer(int){
            let intInput = interaction.options.getInteger(int);
            return intInput;
        }
        function number(num){
            let numInput = interaction.options.getNumber(num);
            return numInput;
        }
        function role(rle){
            let rleInput = interaction.options.getRole(rle);
            return rleInput;
        }
        function embed(field1, field3){
            let embed = new EmbedBuilder()
                .setTitle(`Chatbot Dashboard`)
                .setDescription(`**Control Chatbot With Buttons.**`)
                .addFields(
                    { name: `**Status: **`, value: `\`${field1}\``, inline: true },
                    { name: `\u200b`, value: `\u200b`, inline: true },
                    { name: `**Channel: **`, value: `${field3}`, inline: true },
                )
                .setColor(`${process.env.ec}`)
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`, 
                    iconURL: process.env.iconurl
                });
            return embed;
        }
        function dashCollector(msg){
            const filter = i => i.customId;
		    const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
            collector.on('collect', async i => {
                const checkchannel = db.fetch(`chatbot_${interaction.guild.id}`);
                const checkdisable = db.fetch(`chatbotdisable_${interaction.guild.id}`);
			    if (i.user.id != interaction.user.id) {
				    await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			    } else if(i.customId === "chenable") {
                    db.set(`chatbot_${interaction.guild.id}`, checkdisable)
                    db.delete(`chatbotdisable_${interaction.guild.id}`);
                    buttonRow.components[0].setDisabled(true)
                    buttonRow.components[1].setDisabled(false)
                    await i.update({ embeds: [embed(`Enabled`, `<#${checkdisable}>`)], components: [buttonRow]})
                } else if(i.customId === "chdisable"){
                    db.set(`chatbotdisable_${interaction.guild.id}`, checkchannel);
                    db.delete(`chatbot_${interaction.guild.id}`);
                    buttonRow.components[1].setDisabled(true)
                    buttonRow.components[0].setDisabled(false)
                    await i.update({ embeds: [embed(`Disabled`, `<#${checkchannel}>`)], components: [buttonRow]})
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

//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////

	}
};