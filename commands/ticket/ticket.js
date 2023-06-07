const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ButtonStyle, ButtonBuilder, PermissionsBitField, ActionRowBuilder, ChannelType, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionFlagsBits } = require('discord.js');
const db = require(`quick.db`);

module.exports = class Ticker extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('ticket')
				.setDescription('Setup Ticket System.')
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommand(subcommand =>
                    subcommand.setName('setup')
                        .setDescription(`Setup Ticket System.`)
                        .addChannelOption(option =>
                            option.setName(`channel`)
                                .setRequired(true)
                                .setDescription(`Select Channel That You Want To Send Ticket Panel.`)
                                .addChannelTypes(ChannelType.GuildText))
                        .addChannelOption(option =>
                            option.setName(`category`)
                                .addChannelTypes(ChannelType.GuildCategory)
                                .setRequired(true)
                                .setDescription(`Select Category For Tickets Creation.`))
                        .addChannelOption(option =>
                            option.setName(`ticket_logs`)
                                .setRequired(true)
                                .setDescription(`Setup Ticket Logs Channel.`)
                                .addChannelTypes(ChannelType.GuildText))
                        .addRoleOption(option =>
                            option.setName(`support_role`)
                                .setDescription(`Select Role Those Who Responds To Tickets.`)
                                .setRequired(true)))
                .addSubcommandGroup(group =>
                    group.setName(`send`)
                        .setDescription(`Send/Activate Ticket Panel.`)
                        .addSubcommand(subcommand => 
                            subcommand.setName(`panel`)
                                .setDescription(`Send/Activate Ticket Panel.`)))
                .addSubcommandGroup(group =>
                    group.setName(`edit`)
                        .setDescription(`Edit Ticket Configurations.`)
                        .addSubcommand(subcommand =>
                            subcommand.setName(`role`)
                                .setDescription(`Edit Ticket Support Role.`)
                                .addRoleOption(option =>
                                    option.setName(`support_role`)
                                        .setDescription(`Select Role Those Who Responds To Tickets.`)
                                        .setRequired(true)))
                        .addSubcommand(subcommand =>
                            subcommand.setName(`channel`)
                                .setDescription(`Select Channel That You Want To Send Ticket Panel.`)
                                .addChannelOption(option =>
                                    option.setName(`select_channel`)
                                        .setDescription(`Select Channel That You Want To Send Ticket Panel`)
                                        .setRequired(true)
                                        .addChannelTypes(ChannelType.GuildText)))
                        .addSubcommand(subcommand =>
                            subcommand.setName(`category`)
                                .setDescription(`Select Category For Tickets Creation.`)
                                .addChannelOption(option =>
                                    option.setName(`select_category`)
                                        .setDescription(`Select Category For Tickets Creation.`)
                                        .setRequired(true)
                                        .addChannelTypes(ChannelType.GuildCategory)))
                        .addSubcommand(subcommand =>
                            subcommand.setName(`logs`)
                                .setDescription(`Setup Ticket Logs Channel.`)
                                .addChannelOption(option =>
                                    option.setName(`select_logs_channel`)
                                        .setDescription(`Setup Ticket Logs Channel.`)
                                        .setRequired(true)
                                        .addChannelTypes(ChannelType.GuildText))))
                    .addSubcommandGroup(group =>
                        group.setName(`panel-embed`)
                            .setDescription(`Edit Embed In Ticket System.`)
                            .addSubcommand(subcommand =>
                                subcommand.setName(`title`)
                                    .setDescription(`Edit Embed Title In Ticket Panel.`)
                                    .addStringOption(option =>
                                        option.setName(`text`)
                                            .setDescription(`Enter Text That You Want Set As Title Of Panel Embed.`)
                                            .setRequired(true)))
                            .addSubcommand(subcommand =>
                                subcommand.setName(`description`)
                                    .setDescription(`Edit Embed Description In Ticket Panel.`))
                            .addSubcommand(subcommand =>
                                subcommand.setName(`thumbnail`)
                                    .setDescription(`Edit Embed Thumbnail In Ticket Panel.`)
                                    .addStringOption(option =>
                                        option.setName(`url`)
                                            .setDescription(`Enter Url That You Want Set As Thumbnail Of Panel Embed.`)
                                            .setRequired(true))))
                    .addSubcommand(subcommand =>
                        subcommand.setName(`block`)
                            .setDescription(`Block Any User From Creating Ticket.`)
                            .addUserOption(option => 
                                option.setName(`user`)
                                    .setDescription(`Select User You Want To Block.`)
                                    .setRequired(true)))
                    .addSubcommand(subcommand =>
                        subcommand.setName(`unblock`)
                            .setDescription(`UnBlock Blocked User From Creating Ticket.`)
                            .addUserOption(option => 
                                option.setName(`user`)
                                    .setDescription(`Select User You Want To UnBlock.`)
                                    .setRequired(true)))
                    .addSubcommand(subcommand =>
                         subcommand.setName(`dashboard`)
                            .setDescription(`Get Chatbot Dashboard.`)),
			usage: 'ticket',
			category: 'ticket',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links', 'Manage Guild'],
		});
	}
	async run(client, interaction) {

        
        const ticketdb = client.db.table(`ticket`)
        const ticketembeddb = client.db.table(`ticketembed`)
        let ticketcheck = await ticketdb.get(`${interaction.guild.id}`)
        let ticketembedcheck = await ticketembeddb.get(`${interaction.guild.id}`)
        let subcommand = interaction.options.getSubcommand();

///////////////////////////////////////////////{Dash_Buttons}//////////////////////////////////////////////////

        let buttonRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(`Enable`)
                        .setStyle(ButtonStyle.Success)
                        .setCustomId(`tienable`),
                    new ButtonBuilder()
                        .setLabel(`Disable`)
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`tidisable`),
                    new ButtonBuilder()
                        .setLabel(`Stop`)
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`ticstop`),
                )

///////////////////////////////////////////////{Dash_Buttons}//////////////////////////////////////////////////

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            await interaction.deferReply({ ephemeral: true })
            await interaction.followUp({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "dashboard"){
            const checkchannel = db.fetch(`ticketchannel_${interaction.guild.id}`);
            const checkdisable = db.fetch(`ticketdisable_${interaction.guild.id}`);
            if(!checkchannel){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> Dashboard Is Only Accessable When Ticket System Is Enabled.`})
            } else if(checkchannel){
                if(checkdisable){
                    await interaction.deferReply();
                    buttonRow.components[1].setDisabled(true)
                    const msg = await interaction.followUp({ embeds: [embed("Disabled", `<#${checkchannel}>`)], components: [buttonRow]})
                    dashCollector(msg);
                } else if(!checkdisable){
                    await interaction.deferReply();
                    buttonRow.components[0].setDisabled(true)
                    const msg = await interaction.followUp({ embeds: [embed(`Enabled`, `<#${checkchannel}>`)], components: [buttonRow]})
                    dashCollector(msg);
                }
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "setup"){
            await interaction.deferReply({ ephemeral: true })
            const channel1 =  channel(`channel`);
            const category = channel(`category`);
            const ticketlogs = channel(`ticket_logs`);
            const supportrole = role(`support_role`);

            if(!ticketcheck){
                return await interaction.followUp({ content: `> Done✅. Use "/ticket send pannel" Command To Activate/Send Ticket.` }).then(() => {
                    ticketdb.set(interaction.guild.id, {
                        details: {
                          channel: channel1.id,
                          category: category.id,
                          ticketLogs: ticketlogs.id,
                          supportRole: supportrole.id
                        }
                    });
                })
            } else if(ticketcheck){
                return await interaction.followUp({ content: `> Ticket System Was Already Activated.**Use Below Commands To Edit Ticket System**\n\n> **/ticket edit channel** - Edits Tickets Channel For Panel.\n> **/ticket edit category** - Edits Ticket Creations Category.\n> **/ticket edit logs** - Edits Ticket Logs Channel.\n> **/ticket edit role** - Edits Ticket ssSupport Role.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
        if(subcommand === "panel"){
            const buttonRow = new ActionRowBuilder()
			    .addComponents(
                    new ButtonBuilder()
                        .setLabel('Open')
                        .setEmoji(`📩`)
                        .setCustomId('ticketopen')
                        .setStyle(ButtonStyle.Success),
                )
            if(!ticketcheck){
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> You Have Not Setup Ticket System Yet. Use "/ticket setup" Command To Setup Ticket System.` })
            } else if(ticketcheck){
                let [channel, category, logs, role] = [ticketcheck.details.channel, ticketcheck.details.category, ticketcheck.details.ticketLogs, ticketcheck.details.supportRole];
                let channel1 = interaction.guild.channels.cache.get(channel)
                if(!ticketembedcheck){
                    const embed = new EmbedBuilder()
				        .setTitle(`Ticket`)
				        .setThumbnail(`https://i.imgur.com/RTaQlqV.png`)
				        .setDescription(`> Open Ticket By Clicking Below Button.`)
				        .setColor(`${process.env.ec}`)
				        .setFooter({
                            text: `${client.user.username} - ${process.env.year} ©`,
                            iconURL: process.env.iconurl
				        });
                    await channel1.send({ embeds: [embed], components: [buttonRow] })
                    await interaction.deferReply({ ephemeral: true })
				    return await interaction.followUp({ content: `> Done✅. Activated/Sent Ticket Panel In <#${channel}>.` })
                } else if(ticketembedcheck){
                    let [title, thumbnail, description] = [ticketembedcheck.embed.title, ticketembedcheck.embed.thumbnail, ticketembedcheck.embed.description];
                    try{
                        const embed = new EmbedBuilder()
				            .setTitle(`${title}`)
				            .setThumbnail(`${thumbnail}`)
				            .setDescription(`${description}`)
				            .setColor(`${process.env.ec}`)
				            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`,
                                iconURL: process.env.iconurl
				            });
                        await channel1.send({ embeds: [embed], components: [buttonRow] })
				        await interaction.deferReply({ ephemeral: true })
				        return await interaction.followUp({ content: `> Done✅. Activated/Sent Ticket Panel In <#${channel}>.` })
                    } catch (e){
                        const embed = new EmbedBuilder()
				            .setTitle(`${title}`)
				            .setThumbnail(`https://i.imgur.com/RTaQlqV.png`)
				            .setDescription(`${description}`)
				            .setColor(`${process.env.ec}`)
				            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`,
                                iconURL: process.env.iconurl
				            });
                        await channel1.send({ embeds: [embed], components: [buttonRow] })
                        await interaction.deferReply({ ephemeral: true })
				        return await interaction.followUp({ content: `> Done✅. Activated/Sent Ticket Panel In <#${channel}>.` })
                    }
                }
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "role"){
            if(!ticketcheck){
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> You Have Not Setup Ticket System Yet. Use "/ticket setup" Command To Setup Ticket System.` })
            } else if(ticketcheck){
                await interaction.deferReply({ ephemeral: true })
                let [channel, category, logs, role2] = [ticketcheck.details.channel, ticketcheck.details.category, ticketcheck.details.ticketLogs, ticketcheck.details.supportRole];
                let role1 = role(`support_role`);
                if(role1.id === role2){
                    await interaction.followUp({ content: `> You Should Provide New Role Inorder To Change Old Role.` })
                } else {
                    ticketdb.set(interaction.guild.id, {
                        details: {
                            channel: channel,
                            category: category,
                            ticketLogs: logs,
                            supportRole: role1.id
                        }
                    });
                    const embed = new EmbedBuilder()
                        .setTitle(`Ticket Role Edited`)
                        .setThumbnail(`https://i.imgur.com/RTaQlqV.png`)
                        .addFields(
                            { name: `**OldRole: **`, value: `<@&${role2}>`, inline: true },
                            { name: `**NewRole: **`, value: `${role1}`, inline: true },
                        )
                        .setColor(`${process.env.ec}`)
                        .setFooter({
                            text: `${client.user.username} - ${process.env.year} ©`,
                            iconURL: process.env.iconurl
                        });
                    await interaction.followUp({ embeds: [embed] })
                }
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "channel"){
            const channel = channel(`select_channel`);
            db.set(`ticketchannel_${interaction.guild.id}`, channel.id)
            await interaction.deferReply({ ephemeral: true })
            return await interaction.followUp({ content: `> Done✅. Ticket Channel Has Been Updated.\n> **Delete Panel Message In Old Channel.**\n> **Use "/ticket send panel" Command To Send Panel To Updated Channel.**"` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "category"){
            const category = channel(`select_category`);
            db.set(`ticketcategory_${interaction.guild.id}`, category.id)
            await interaction.deferReply({ ephemeral: true })
            return await interaction.followUp({ content: `> Done✅. Ticket Category Has Been Updated.` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "logs"){
            const logs = channel(`select_logs_channel`);
            db.set(`ticketlogs_${interaction.guild.id}`, logs.id)
            await interaction.deferReply({ ephemeral: true })
            return await interaction.followUp({ content: `> Done✅. Ticket Logs Has Been Updated.` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "block"){
            let user1 = user(`user`);
            let usercheck = db.fetch(`ticketblock_${interaction.guild.id}_${user1.id}`)
            if(usercheck){
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> This User Has Been Already Blocked.` })
            }
            if(!usercheck){
                db.set(`ticketblock_${interaction.guild.id}_${user1.id}`, true)
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> Done✅. Blocked User From Creating Ticket.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "unblock"){
            let user1 = user(`user`);
            let usercheck = db.fetch(`ticketblock_${interaction.guild.id}_${user1.id}`)
            if(usercheck){
                db.delete(`ticketblock_${interaction.guild.id}_${user1.id}`)
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> Done✅. UnBlocked User From Creating Ticket.` })
            }
            if(!usercheck){
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> This User Was Not Blocked To UnBlock.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "title"){
            const title = string(`text`)
            let titlecheck = db.fetch(`tickettitle_${interaction.guild.id}`)
            if(title.length > 256){
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> Embed Title Can't Be More Than 256 Characters.` })
            } else if(!titlecheck) {
                db.set(`tickettitle_${interaction.guild.id}`, `${title}`)
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> Done✅. Ticket Panel Embed Title Was Now Set, Use "/ticket send panel" Command To Send Updated Embed.` })
            } else if(titlecheck){
                db.set(`tickettitle_${interaction.guild.id}`, `${title}`)
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `Done✅. Ticket Panel Embed Title Was Now Updated, Use "/ticket send panel" Command To Send Updated Embed.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "description"){
            let descriptioncheck = db.fetch(`ticketdescription_${interaction.guild.id}`)
            if(!descriptioncheck) {
                const descriptionnew = new ModalBuilder()
                    .setCustomId('myModalDescriptioNew')
                    .setTitle('Ticket System Configuration.')
                    .addComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setCustomId('text')
                                    .setLabel("Set Ticket Panel Embed Description.")
                                    .setStyle(TextInputStyle.Paragraph)
                            )
                    )
                await interaction.showModal(descriptionnew);
            } else if(descriptioncheck){
                const descriptionold = new ModalBuilder()
                    .setCustomId('myModalDescriptioOld')
                    .setTitle('Ticket System Configuration.')
                    .addComponents(
                        new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setCustomId('text')
                                    .setLabel("Set Ticket Panel Embed Description.")
                                    .setStyle(TextInputStyle.Paragraph)
                            )
                    )
                await interaction.showModal(descriptionold);
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "thumbnail"){
            const thumbnail = string(`url`)
            let thumbnailcheck = db.fetch(`ticketthumbnail_${interaction.guild.id}`)
            let validurl = isValidURL(thumbnail)
            if(validurl === false){
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> Invlaid Url.` })
            } else if(validurl === true){
                if(!thumbnailcheck) {
                    db.set(`ticketthumbnail_${interaction.guild.id}`, `${thumbnail}`)
                    await interaction.deferReply({ ephemeral: true })
                    return await interaction.followUp({ content: `> Done✅. Ticket Panel Embed Thumbnail Was Now Set, Use "/ticket send panel" Command To Send Updated Embed.` })
                } else if(thumbnailcheck){
                    db.set(`ticketthumbnail_${interaction.guild.id}`, `${thumbnail}`)
                    await interaction.deferReply({ ephemeral: true })
                    return await interaction.followUp({ content: `Done✅. Ticket Panel Embed Thumbnail Was Now Updated, Use "/ticket send panel" Command To Send Updated Embed.` })
                }
            }
        }

//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////

        function string(text){
            let stringInput = interaction.options.getString(text);
            return stringInput;
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
        function isValidURL(url){
            const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
            return pattern.test(url);
        }
        function embed(field1, field3){
            let embed = new EmbedBuilder()
                .setTitle(`Ticket Dashboard`)
                .setDescription(`**Control Ticket System With Buttons.**`)
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
                const checkchannel = db.fetch(`ticketchannel_${interaction.guild.id}`);
                const checkdisable = db.fetch(`ticketdisable_${interaction.guild.id}`);
			    if (i.user.id != interaction.user.id) {
				    await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			    } else if(i.customId === "tienable") {
                    db.delete(`ticketdisable_${interaction.guild.id}`);
                    buttonRow.components[0].setDisabled(true)
                    buttonRow.components[1].setDisabled(false)
                    await i.update({ embeds: [embed(`Enabled`, `<#${checkchannel}>`)], components: [buttonRow]})
                } else if(i.customId === "tidisable"){
                    db.set(`ticketdisable_${interaction.guild.id}`, "true");
                    buttonRow.components[1].setDisabled(true)
                    buttonRow.components[0].setDisabled(false)
                    await i.update({ embeds: [embed(`Disabled`, `<#${checkchannel}>`)], components: [buttonRow]})
                } else if(i.customId === "ticstop"){
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