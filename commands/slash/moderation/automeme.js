const Command = require('../../../structures/Commands/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits, ChannelType } = require('discord.js');
const db = require(`quick.db`)

module.exports = class Avatar extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('automeme')
				.setDescription(`Set Automeme Channel(beta).`)
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommandGroup(group =>
                    group.setName(`channel`)
                        .setDescription(`Set And Delete Automeme Channel.`)
                        .addSubcommand(subcommand => 
                            subcommand.setName(`set`)
                                .setDescription(`Set Automeme Channel(beta)`)
                                .addChannelOption(option => 
                                    option.setName(`channel`)
                                        .setDescription(`Select A Channel For Automeme(beta).`)
                                        .addChannelTypes(ChannelType.GuildText)
                                        .setRequired(true)))
                        .addSubcommand(subcommand =>
                            subcommand.setName(`delete`)
                            .setDescription(`Delete Automeme Channel.`))),
			usage: 'automeme',
			category: 'moderation',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
        
        await interaction.deferReply({ ephemeral: true })
        let automemedb = client.db.table(`automeme`)
        let automemecheck = await automemedb.get(`${interaction.guild.id}`)
        let subcommand = interaction.options.getSubcommand();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            await interaction.followUp({ content: `> You Need "Manage Guild" Permission To Use This Command`})
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "set"){
            let channel1 = channel(`channel`);
            if(!automemecheck){
                automemedb.set(`${interaction.guild.id}`, `${channel1.id}`)
                return interaction.followUp({ content: `> Done✅. Automeme Channel Set.\n\n**Note: **As Automeme Is In Beta Stage Meme Will Be Posted For Every 1 Hr.` })
            } else if(automemecheck){
                if(automemecheck === channel1.id){
                    return interaction.followUp({ content: `> Automeme Already Linked To This Channel.` })
                } else {
                    automemedb.set(`${interaction.guild.id}`, `${channel1.id}`)
                    return interaction.followUp({ content: `> Done✅. Updated Automeme Channel.\n\n**Note: **As Automeme Is In Beta Stage Meme Will Be Posted For Every 1 Hr.` })
                }
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if(subcommand === "delete"){
            if(!automemecheck){
                return await interaction.followUp({ content: `> Automeme Was Not Bounded To Any Channel.`})
            } else if(automemecheck){
                await automemedb.delete(`${interaction.guild.id}`);
                return await interaction.followUp({ content: `> Chatbot Was Now Deleted In <#${automemecheck}>.`})
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

//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////
	}
};