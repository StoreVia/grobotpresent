const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const db = require(`quick.db`);

module.exports = class Welcome extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('welcome')
				.setDescription('Setup Welcome System.')
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommandGroup(group =>
                    group.setName(`channel`)
                        .setDescription(`Set Welcome Channel.`)
                        .addSubcommand(subcommand =>
                            subcommand.setName('set')
                                .setDescription('Set Welcome Channel.')
                                .addChannelOption(option =>
                                    option.setName('channel')
                                        .addChannelTypes(ChannelType.GuildText)
                                        .setDescription('Select Channel')
                                        .setRequired(true)))
                        .addSubcommand(subcommand =>
                            subcommand.setName('delete')
                                .setDescription('Delete Welcome Channel.')))
                .addSubcommandGroup(group =>
                    group.setName(`edit`)
                        .setDescription(`Welcome System Configuration.`)
                        .addSubcommand(subcommand =>
                            subcommand.setName(`text`)
                                .setDescription(`Edit Text Welcome Message When A User Join's Server.`))
                        .addSubcommand(subcommand =>
                            subcommand.setName(`color`)
                                    .setDescription(`Edit Text Color In Welcome Image.`))
                        .addSubcommand(subcommand =>
                            subcommand.setName(`background`)
                                .setDescription(`Edit Welcome Image Background.`)
                                .addStringOption(option =>
                                    option.setName('url')
                                        .setDescription(`Enter Background Url For Welcome Message.`)
                                        .setRequired(true))))
                .addSubcommandGroup(group =>
                    group.setName(`dm`)
                        .setDescription(`Dm's User When Joined Server.`)
                        .addSubcommand(subcommand =>
                            subcommand.setName(`user`)
                                .setDescription(`Dm's User When Joined Server.`)
                                .addStringOption(option =>
                                    option.setName(`set`)
                                        .setDescription(`Dm's User When Joined Server Settings.`)
                                        .setRequired(true)
                                        .addChoices(
                                            { name: 'On', value: 'on'},
                                            { name: 'Off', value: 'off'}
                                        ))))
                .addSubcommandGroup(group =>
                    group.setName(`dm-user`)
                        .setDescription(`Edit User's Dm Welcome Message When That User Join's Server.`)
                        .addSubcommand(subcommand =>
                            subcommand.setName(`text-edit`)
                                .setDescription(`Edit User's Dm Welcome Message When That User Join's Server.`)))
                .addSubcommand(subcommand => 
                    subcommand.setName(`guide`)
                        .setDescription(`Get Guidence About Setting Welcome System.`)),
			usage: 'welcome',
			category: 'welcome',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links', 'Manage Guild'],
		});
	}
	async run(client, interaction) {

        const welcomesetdb = client.db.table(`welcome`);
        const welcomeconfirgurationdb = client.db.table(`welcomeconfiguration`);
        const welcomedmdb = client.db.table(`welcomedm`);
        const welcomesetcheck = await welcomesetdb.get(`${interaction.guild.id}`);
        const welcomeconfirgurationcheck = await welcomeconfirgurationdb.get(`${interaction.guild.id}`);
        const welcomedmcheck = await welcomedmdb.get(`${interaction.guild.id}`);
        let subcommand = interaction.options.getSubcommand();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'set') {
            const channel1 = channel('channel');
            if(!welcomesetcheck){
                await interaction.deferReply({ ephemeral: true });
                await welcomesetdb.set(`${interaction.guild.id}`, channel1.id);
                return await interaction.followUp({ content: `> Welcome System Was Now Bounded To ${channel1}.`})
            } else if(channel1.id === welcomesetcheck){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> Welcome System Was Already Linked To ${channel1}.`})
            } else if(channel1.id != welcomesetcheck){
                await interaction.deferReply({ ephemeral: true });
                await welcomesetdb.set(`${interaction.guild.id}`, channel1.id);
                return await interaction.followUp({ content: `> Welcome System Was Now Updated To ${channel1}.`})
            }
        }
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "delete"){
            if(!welcomesetcheck){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> Welcome System Was Not Bounded To Any Channel.`})
            } else if(welcomesetcheck){
                await interaction.deferReply({ ephemeral: true });
                await welcomesetdb.delete(`${interaction.guild.id}`);
                return await interaction.followUp({ content: `> Welcome System Was Now Deleted In <#${welcomesetcheck}>.`})
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'background') {
            const background = string('url');
            let validurl = isValidURL(background)
            if(!welcomesetcheck){
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> You Have Not Setup Welcome System Yet. Use "/welcome set" Command To Setup Welcome System.` })
            } else {
                if(validurl === false){
                    await interaction.deferReply({ ephemeral: true })
                    return await interaction.followUp({ content: `> Invlaid Url.` })
                } else if(validurl === true){
                    let text1 = welcomeconfirgurationcheck?.text || null;
				    let color1 = welcomeconfirgurationcheck?.color || null;
                    welcomeconfirgurationdb.set(`${interaction.guild.id}`, {
                        text: text1,
                        color: color1,
                        thumbnail: background 
                    })
                    await interaction.deferReply({ ephemeral: true })
                    return await interaction.followUp({ content: `> Done✅. Welcome Image Background Was Updated.` })
                }
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "guide"){
            const embed = new EmbedBuilder()
                .setTitle(`GroBot Welcome System Guide `)
                .setDescription(`> **Note: **Use \`:emoji_name:\` To Use Emoji In Welcome Message,Use \`<a:emoji_name:emoji_id>\` To Use Emoji Gif In Welcome Message & This Message Also Inlcudes For Dm Messages.`)
                .setImage(`https://i.imgur.com/YvxM0bc.png`)
                .setColor(`${process.env.ec}`)
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`,
                    iconURL: process.env.iconurl
                })
            await interaction.deferReply({ ephemeral: true })
            await interaction.followUp({ embeds: [embed] })
            
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "edit"){
            const welcometextedit = new ModalBuilder()
			    .setCustomId('myModalWelcomeTextEdit')
			    .setTitle('Welcome System Configuration.');
		    const welcometextedit1 = new TextInputBuilder()
			    .setCustomId('text1')
			    .setLabel("Send's This Text When Some One Join Server.")
			    .setStyle(TextInputStyle.Paragraph);
		    const welcometextedit0 = new ActionRowBuilder().addComponents(welcometextedit1);
		    welcometextedit.addComponents(welcometextedit0);
            await interaction.showModal(welcometextedit);
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "user"){
            const set = string("set");
            const userdmoncheck = db.fetch(`welcomedm_${interaction.guild.id}`, "on")
            const userdmoffcheck = db.fetch(`welcomedm_${interaction.guild.id}`, "off")
            if(set === "on"){
                if(userdmoncheck){
                    await interaction.reply({ content: `> Dm-User Was Already Enabled. If You Want To Edit Welcome Dm Message Use \`/welcome dm-user text-edit\` Command.`, ephemeral: true})
                } else if(!userdmoncheck){
                    const welcomedmusernew = new ModalBuilder()
                        .setCustomId('myModalDmUserNew')
                        .setTitle('Welcome System Configuration.');
                    const welcomedmusernew1 = new TextInputBuilder()
                        .setCustomId('text2')
                        .setLabel("Send's This DmText When Some One Join Server.")
                        .setStyle(TextInputStyle.Paragraph);
                    const welcomedmusernew0 = new ActionRowBuilder().addComponents(welcomedmusernew1);
                    welcomedmusernew.addComponents(welcomedmusernew0);
                    db.set(`welcomedm_${interaction.guild.id}`, "on")
                    await interaction.showModal(welcomedmusernew)
                }
            } else if(set === "off"){
                if(userdmoffcheck){
                    db.delete(`welcomedm_${interaction.guild.id}`, "off")
                    await interaction.reply({ content: `> Done✅. Dm-User Was Disabled Now.`, ephemeral: true})
                }
                if(!userdmoffcheck){
                    await interaction.reply({ content: `> Dm-User Was Already Disabled.`, ephemeral: true})
                }
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "text-edit"){
            const welcomedmuserold = new ModalBuilder()
			    .setCustomId('myModalDmUserTextEdit')
			    .setTitle('Welcome System Configuration.');
		    const welcomedmuserold1 = new TextInputBuilder()
			    .setCustomId('text3')
			    .setLabel("Send's This DmText When Some One Join Server.")
			    .setStyle(TextInputStyle.Paragraph);
		    const welcomedmuserold0 = new ActionRowBuilder().addComponents(welcomedmuserold1);
		    welcomedmuserold.addComponents(welcomedmuserold0);
            await interaction.showModal(welcomedmuserold);
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "color"){
            const selectMenuRow = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setPlaceholder('Select An Option')
                        .setCustomId('colors')
                        .setDisabled(false)
                        .setMaxValues(1)
                        .setOptions([
                            {
                                label: 'Black',
                                value: '000000',
                                emoji: '⬛',
                            },
                            {
                                label: 'White',
                                value: 'FFFFFF',
                                emoji: '⬜',
                            },
                            {
                                label: 'Orange',
                                value: 'FFA500',
                                emoji: '🟧',
                            },
                            {
                                label: 'Blue',
                                value: '87CEEB',
                                emoji: '🟦',
                            },
                            {
                                label: 'Red',
                                value: 'FF0000',
                                emoji: '🟥',
                            },
                            {
                                label: 'Brown',
                                value: '964B00',
                                emoji: '🟫',
                            },
                            {
                                label: 'Purple',
                                value: 'A020F0',
                                emoji: '🟪',
                            },
                            {
                                label: 'Green',
                                value: '00FF00',
                                emoji: '🟩',
                            },
                            {
                                label: 'Yellow',
                                value: 'FFFF00',
                                emoji: '🟨',
                            },
                        ]   
                    ),
                );
            const disabled = new ActionRowBuilder()
			    .addComponents(
				    new StringSelectMenuBuilder()
					    .setPlaceholder('Select An Option')
					    .setCustomId('colors1')
					    .setDisabled(true)
                	    .setOptions([
						    {
							    label: 'GroBot',
							    value: 'grobot',
							    emoji: '🤖',
						    }, 
                        ]
                    )
			    );
            const embed = new EmbedBuilder()
                .setTitle(`Select The Color`)
                .setColor(`${process.env.ec}`)
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`, 
                    iconURL: process.env.iconurl
                })
                .setDescription(`Select One Of The Option Below.\n\n> Note :- **Selecting Color Changes Text Color In Welcome Image.**`)
            await interaction.reply({ embeds: [embed], components: [selectMenuRow], ephemeral: true })
            const filter = i => i.customId === 'colors';
            const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 60000 });
            collector.on('collect', async i => {
			    if (i.user.id != interaction.user.id) {
				    await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			    }
			    const selected = i.values[0];
			    if (i.customId === 'colors') {
                    if(selected === "000000"){
				        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Black.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
                    }
                    if(selected === "FFFFFF"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To White.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }
                    if(selected === "FFA500"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Orange.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }
                    if(selected === "87CEEB"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Blue.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }
                    if(selected === "FF0000"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Red.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
                    }
                    if(selected === "964B00"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Brown.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }
                    if(selected === "A020F0"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Purple.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }
                    if(selected === "00FF00"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Green.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }
                    if(selected === "FFFF00"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Yellow.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }
                }
	        })
	        collector.on('end', async (_, reason) => {
                if (reason === 'idle') {
                    await interaction.editReply({ components: [disabled] });
                }
            });
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
        if(subcommand === "123"){
            /**const welcome = new ModalBuilder()
                .setCustomId('WelcomeTextSet')
                .setTitle('Welcome System Configuration.')
                .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId('text')
                                .setLabel("Send's This Text When Some One Join Server.")
                                .setStyle(TextInputStyle.Paragraph)
                        )
                )
            */
        }
	}
};

