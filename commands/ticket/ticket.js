const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ButtonStyle, ButtonBuilder, PermissionsBitField, ActionRowBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
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
                        group.setName(`embed`)
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
                                    .setDescription(`Edit Embed Description In Ticket Panel.`)
                                    .addStringOption(option =>
                                        option.setName(`text`)
                                            .setDescription(`Enter Text That You Want Set As Description Of Panel Embed.`)
                                            .setRequired(true)))
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
                                    .setRequired(true))),
			usage: 'ticket',
			category: 'ticket',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links', 'Manage Guild'],
		});
	}
	async run(client, interaction) {

        let subcommand = interaction.options.getSubcommand();
        await interaction.deferReply({ ephemeral: true })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            await interaction.followUp({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "setup"){
            const channel1 =  channel(`channel`);
            const category = channel(`category`);
            const ticketlogs = channel(`ticket_logs`);
            const supportrole = role(`support_role`);

            db.set(`ticketchannel_${interaction.guild.id}`, channel1.id)
            db.set(`ticketcategory_${interaction.guild.id}`, category.id)
            db.set(`ticketlogs_${interaction.guild.id}`, ticketlogs.id)
            db.set(`ticketrole_${interaction.guild.id}`, supportrole.id)
            
            return await interaction.followUp({ content: `> Done✅. Use "/ticket send pannel" Command To Activate/Send Ticket.` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
        if(subcommand === "panel"){
            let check = db.fetch(`ticketchannel_${interaction.guild.id}`)
            let channel1 = client.channels.cache.get(check)
            let title = db.fetch(`tickettitle_${interaction.guild.id}`) || "Ticket"
            let thumbnail = db.fetch(`ticketthumbnail_${interaction.guild.id}`) || "https://i.imgur.com/RTaQlqV.png"
            let description = db.fetch(`ticketdescription_${interaction.guild.id}`) || "> Open Ticket By Clicking Below Button."
            if(!check){
                return await interaction.followUp({ content: `> You Have Not Setup Ticket System Yet. Use "/ticket setup" Command To Setup Ticket System.` })
            } else if(check){
                try {
                    const buttonRow = new ActionRowBuilder()
			            .addComponents(
				            new ButtonBuilder()
				                .setLabel('Open')
				                .setEmoji(`📩`)
				                .setCustomId('ticketopen')
				                .setStyle(ButtonStyle.Success),
				                )
				    const embed = new EmbedBuilder()
				        .setTitle(`${title}`)
				        .setThumbnail(`${thumbnail}`)
				        .setDescription(`${description}`)
				        .setColor(`${process.env.ec}`)
				        .setFooter({
                            text: `${client.user.username} - ${process.env.year} ©`,
                            iconURL: process.env.iconurl
				        });
                    channel1.send({ embeds: [embed], components: [buttonRow] })
				    return await interaction.followUp({ content: `> Done✅. Activated/Sent Ticket Panel In <#${check}>.` })
                } catch(e) {
                    const embed = new EmbedBuilder()
				        .setTitle(`${title}`)
				        .setThumbnail(`https://i.imgur.com/RTaQlqV.png`)
				        .setDescription(`${description}`)
				        .setColor(`${process.env.ec}`)
				        .setFooter({
                            text: `${client.user.username} - ${process.env.year} ©`,
                            iconURL: process.env.iconurl
				        });
                    channel1.send({ embeds: [embed], components: [buttonRow] })
				    return await interaction.followUp({ content: `> Done✅. Activated/Sent Ticket Panel In <#${check}>.` })
                }
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "role"){
            const role1 = role(`support_role`);
            db.set(`ticketrole_${interaction.guild.id}`, role1.id)
            return await interaction.followUp({ content: `> Done✅. Support Role Has Been Edited.` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "channel"){
            const channel = channel(`select_channel`);
            db.set(`ticketchannel_${interaction.guild.id}`, channel.id)
            return await interaction.followUp({ content: `> Done✅. Ticket Channel Has Been Updated.\n> **Delete Panel Message In Old Channel.**\n> **Use "/ticket send panel" Command To Send Panel To Updated Channel.**"` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "category"){
            const category = channel(`select_category`);
            db.set(`ticketcategory_${interaction.guild.id}`, category.id)
            return await interaction.followUp({ content: `> Done✅. Ticket Category Has Been Updated.` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "logs"){
            const logs = channel(`select_logs_channel`);
            db.set(`ticketlogs_${interaction.guild.id}`, logs.id)
            return await interaction.followUp({ content: `> Done✅. Ticket Logs Has Been Updated.` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "block"){
            let user1 = user(`user`);
            let usercheck = db.fetch(`ticketblock_${interaction.guild.id}_${user1.id}`)
            if(usercheck){
                return await interaction.followUp({ content: `> This User Has Been Already Blocked.` })
            }
            if(!usercheck){
                db.set(`ticketblock_${interaction.guild.id}_${user1.id}`, true)
                return await interaction.followUp({ content: `> Done✅. Blocked User From Creating Ticket.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "unblock"){
            let user1 = user(`user`);
            let usercheck = db.fetch(`ticketblock_${interaction.guild.id}_${user1.id}`)
            if(usercheck){
                db.delete(`ticketblock_${interaction.guild.id}_${user1.id}`)
                return await interaction.followUp({ content: `> Done✅. UnBlocked User From Creating Ticket.` })
            }
            if(!usercheck){
                return await interaction.followUp({ content: `> This User Was Not Blocked To UnBlock.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "title"){
            const title = string(`text`)
            let titlecheck = db.fetch(`tickettitle_${interaction.guild.id}`)
            if(title.length > 256){
                return await interaction.followUp({ content: `> Embed Title Can't Be More Than 256 Characters.` })
            } else if(!titlecheck) {
                db.set(`tickettitle_${interaction.guild.id}`, `${title}`)
                return await interaction.followUp({ content: `> Done✅. Ticket Panel Embed Title Was Now Set, Use "/ticket send panel" Command To Send Updated Embed.` })
            } else if(titlecheck){
                db.set(`tickettitle_${interaction.guild.id}`, `${title}`)
                return await interaction.followUp({ content: `Done✅. Ticket Panel Embed Title Was Now Updated, Use "/ticket send panel" Command To Send Updated Embed.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "description"){
            const description = string(`text`)
            let descriptioncheck = db.fetch(`ticketdescription_${interaction.guild.id}`)
            if(description.length > 4096){
                return await interaction.followUp({ content: `> Embed Description Can't Be More Than 4096 Characters.` })
            } else if(!descriptioncheck) {
                db.set(`tickettitle_${interaction.guild.id}`, `${description}`)
                return await interaction.followUp({ content: `> Done✅. Ticket Panel Embed Description Was Now Set, Use "/ticket send panel" Command To Send Updated Embed.` })
            } else if(descriptioncheck){
                db.set(`tickettitle_${interaction.guild.id}`, `${description}`)
                return await interaction.followUp({ content: `Done✅. Ticket Panel Embed Description Was Now Updated, Use "/ticket send panel" Command To Send Updated Embed.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "thumbnail"){
            const thumbnail = string(`url`)
            let thumbnailcheck = db.fetch(`ticketthumbnail_${interaction.guild.id}`)
            let validurl = isValidURL(thumbnail)
            if(validurl === false){
                return await interaction.followUp({ content: `> Invlaid Url.` })
            } else if(validurl === true){
                if(!thumbnailcheck) {
                    db.set(`ticketthumbnail_${interaction.guild.id}`, `${thumbnail}`)
                    return await interaction.followUp({ content: `> Done✅. Ticket Panel Embed Thumbnail Was Now Set, Use "/ticket send panel" Command To Send Updated Embed.` })
                } else if(thumbnailcheck){
                    db.set(`tickettitle_${interaction.guild.id}`, `${thumbnail}`)
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

//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////
	}
};