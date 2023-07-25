const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = class InteractionChatBot extends Command {
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
        let functions = client.functions;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(!await functions.permsCheck(`manageGuild`)){
            return await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'set') {
            const channel = await functions.getOptions(interaction).channel('channel');
            if(!checkchannel){
                await interaction.deferReply({ ephemeral: true });
                await chatbotdb.set(`${interaction.guild.id}`, channel.id);
                return await interaction.followUp({ content: `> Chatbot Was Now Bounded To ${channel}.`})
            } else if(channel.id === checkchannel){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> Chatbot Was Already Linked To ${channel}.`})
            } else if(channel.id != checkchannel){
                await interaction.deferReply({ ephemeral: true });
                await chatbotdb.set(`${interaction.guild.id}`, channel.id);
                return await interaction.followUp({ content: `> Chatbot Was Now Updated To ${channel}.`})
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	}
};