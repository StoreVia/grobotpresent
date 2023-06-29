const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, EmbedBuilder, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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
                        .setDescription('Delete Chatbot Channel.')),
			usage: 'chatbot',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const chatbotdb = client.db.table(`chatbot`)
        const checkchannel = await chatbotdb.get(`${interaction.guild.id}`);
        let subcommand = interaction.options.getSubcommand();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            return await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'set') {
            const channel1 = channel('channel');
            if(!checkchannel){
                await interaction.deferReply({ ephemeral: true });
                await chatbotdb.set(`${interaction.guild.id}`, channel1.id);
                return await interaction.followUp({ content: `> Chatbot Was Now Bounded To ${channel1}.`})
            } else if(channel1.id === checkchannel){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> Chatbot Was Already Linked To ${channel1}.`})
            } else if(channel1.id != checkchannel){
                await interaction.deferReply({ ephemeral: true });
                await chatbotdb.set(`${interaction.guild.id}`, channel1.id);
                return await interaction.followUp({ content: `> Chatbot Was Now Updated To ${channel1}.`})
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === 'delete'){
            if(!checkchannel){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> Chatbot Was Not Bounded To Any Channel.`})
            } else if(checkchannel){
                await interaction.deferReply({ ephemeral: true });
                await chatbotdb.delete(`${interaction.guild.id}`);
                return await interaction.followUp({ content: `> Chatbot Was Now Deleted In <#${checkchannel}>.`})
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

//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////

	}
};