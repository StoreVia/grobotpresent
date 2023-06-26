const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, StringSelectMenuBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, Embed, ButtonStyle, ButtonBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const db = require(`quick.db`)

module.exports = class Leave extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('leave')
				.setDescription('Sends Leave Message When User Left Server.')
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommandGroup(group =>
                    group.setName(`channel`)
                        .setDescription(`Set Leave Message Channel.`)
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
                    group.setName(`text`)
                        .setDescription(`Edit Leave Message.`)
                        .addSubcommand(subcommand =>
                            subcommand.setName(`edit`)
                                .setDescription(`Edit Leave Message`)))
                .addSubcommand(subcommand => 
                    subcommand.setName(`guide`)
                        .setDescription(`Get Guidence About Setting Leave System`)),
			usage: 'ping',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        let subcommand = interaction.options.getSubcommand();
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command`})
        }
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === 'set') {
            const channel = interaction.options.getChannel('channel');
            const channelcheck = db.fetch(`leave_${interaction.guild.id}`, channel.id)
            if(!channelcheck){
                const leavenew = new ModalBuilder()
                    .setCustomId('myModalLeaveNew')
                    .setTitle('Leaving Message Configuration.');
                const leavenew1 = new TextInputBuilder()
                    .setCustomId('text')
                    .setLabel("Send's This Text When Some One Leave Server.")
                    .setStyle(TextInputStyle.Paragraph);
                const leavenew0 = new ActionRowBuilder().addComponents(leavenew1);
                leavenew.addComponents(leavenew0);

                db.set(`leave_${interaction.guild.id}`, channel.id);
                await interaction.showModal(leavenew);
            } else if(channelcheck){
                const leaveold = new ModalBuilder()
                    .setCustomId('myModalLeaveOld')
                    .setTitle('Welcome System Configuration.');
                const leaveold1 = new TextInputBuilder()
                    .setCustomId('text')
                    .setLabel("Send's This Text When Some One Leave Server.")
                    .setStyle(TextInputStyle.Paragraph);
                const leaveold0 = new ActionRowBuilder().addComponents(leaveold1);
                leaveold.addComponents(leaveold0);
                await interaction.showModal(leaveold);
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "edit"){
            const leavetextedit = new ModalBuilder()
                .setCustomId('myModalLeaveEditText')
                .setTitle('Leaving Message Configuration.');
            const leavetextedit1 = new TextInputBuilder()
                .setCustomId('text1')
                .setLabel("Send's This Text When Some One Leave Server.")
                .setStyle(TextInputStyle.Paragraph);
            const leavetextedit0 = new ActionRowBuilder().addComponents(leavetextedit1);
            leavetextedit.addComponents(leavetextedit0);
            await interaction.showModal(leavetextedit);
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "delete"){
            let leavecheck = db.fetch(`leave_${interaction.guild.id}`)
            if(!leavecheck){
                await interaction.deferReply({ ephemeral: true })
                await interaction.followUp({ content: `> Leaving Message System Was Not Linked In This Server To Delete.`, ephemeral: true})
            } else if(leavecheck){
                db.delete(`leave_${interaction.guild.id}`);
                await interaction.deferReply({ ephemeral: true })
                await interaction.followUp({ content: `> Leaving Message System Was Now Deleted In This Server.`, ephemeral: true})
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "guide"){
            const embed = new EmbedBuilder()
                .setTitle(`GroBot Leave System Guide `)
                .setDescription(`> **Note: **Use \`:emoji_name:\` To Use Emoji In Leave Message,Use \`<a:emoji_name:emoji_id>\` To Use Emoji Gif In Leave Message.`)
                .setImage(`https://i.imgur.com/aAoLgdQ.png`)
                .setColor(`${process.env.ec}`)
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`,
                    iconURL: process.env.iconurl
                })
            await interaction.deferReply({ ephemeral: true })
            await interaction.followUp({ embeds: [embed] })
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

//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////
	}
};