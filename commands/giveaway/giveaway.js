const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType } = require('discord.js');
const config = require("../../giveaway_utility/config.json")
messages = require('../../giveaway_utility/message');
const ms = require('ms');

module.exports = class Giveaway extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('giveaway')
				.setDescription('Create Giveaways.')
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('create')
                        .setDescription('Create A Giveaway.')
                        .addChannelOption(option =>
                            option.setName('channel')
                                .addChannelTypes(ChannelType.GuildText)
                                .setDescription('Select Channel')
                                .setRequired(true))
                        .addStringOption(option =>
                            option.setName('prize')
                                .setDescription('Enter Prize.')
                                 .setRequired(true))
                        .addStringOption(option =>
                            option.setName('duration')
                                .setDescription('Enter Duration(eg:- 10s, 10min, 10hrs, 10d).')
                                .setRequired(true))
                        .addIntegerOption(option =>
                            option.setName('winnercount')
                                .setDescription('Enter Winner Count.')
                                .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('delete')
                        .setDescription('Delete A Giveaway.')
                        .addStringOption(option =>
                            option.setName('query')
                            .setDescription('Enter Giveaway Message Id (Or) Prize.')
                            .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('end')
                        .setDescription('End A Giveaway.')
                        .addStringOption(option =>
                            option.setName('query')
                                .setDescription('Enter Giveaway Message Id (Or) Prize.')
                                .setRequired(true)))
               .addSubcommand(subcommand =>
                    subcommand
                        .setName('pause')
                        .setDescription('Pause A Giveaways.')
                        .addStringOption(option =>
                            option.setName('query')
                                .setDescription('Enter Giveaway Message Id (Or) Prize.')
                                .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('resume')
                        .setDescription('Resume A Giveaways.')
                        .addStringOption(option =>
                            option.setName('query')
                                .setDescription('Enter Giveaway Message Id (Or) Prize.')
                                .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`reroll`)
                        .setDescription(`Reroll A Giveaway`)
                        .addStringOption(option =>
                            option.setName(`query`)
                                .setDescription(`Enter Giveaway Message Id (Or) Prize.`)
                                .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('edit')
                        .setDescription('Edit A Giveaway.')
                        .addStringOption(option =>
                            option.setName('query')
                                .setDescription('Enter Giveaway Message Id (Or) Prize.')
                                .setRequired(true))
                        .addStringOption(option =>
                            option.setName('prize')
                                .setDescription('Enter Prize.')
                                .setRequired(false))
                        .addIntegerOption(option =>
                            option.setName('winnercount')
                                .setDescription('Enter Winner Count.')
                                .setRequired(false))),
			usage: 'giveaway',
			category: 'giveaway',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links', 'Manage Guild'],
		});
	}
	async run(client, interaction) {
        
        let subcommand = interaction.options.getSubcommand();
        await interaction.deferReply({ ephemeral: true })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            return await interaction.followUp({ content: `> You Need "Manage Guild" Permission To Use This Command`})
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'create') {
            const channel1 = channel('channel');
            const duration1 = string('duration');
            const duration = ms(duration1)
            const winnerCount = integer('winnercount');
            const prize = string('prize');
            return client.giveawaysManager.start(channel1, {
                prize,
                duration,
                winnerCount,
                messages,
                hostedBy: interaction.user,
            }).then(() => {
                interaction.followUp({content: `Done✅. Giveaway Started In ${channel1}`})
            }).catch((err) => {
                interaction.followUp({ content: '> Failed To Start Giveaway. Please Make Sure You Have Entered Correct Details.'})
            })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'delete') {
            const query = string(`query`);
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                await interaction.deferReply({ ephemeral: true })
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else {
                client.giveawaysManager.delete(giveaway.messageId).then(() => {
                    interaction.followUp({content: `Done✅. Giveaway Deleted.` })
                })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'end') {
            const query = string(`query`);
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else if(giveaway.ended){
                interaction.followUp({ content: `> This Giveaway Has Been Already Ended.` })
            } else {
                client.giveawaysManager.end(giveaway.messageId).then(() => {
                    interaction.followUp({content: `Done✅. Giveaway Ended.` })
                })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'pause') {
            const query = string('query');
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else if(giveaway.paused){
                interaction.followUp({ content: `> This Giveaway Has Been Already Paused.` })
            } else {
                client.giveawaysManager.pause(giveaway.messageId).then(() => {
                    interaction.followUp({content: `Done✅. Giveaway Paused.` })
                })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'resume') {
            const query = string('query');
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else if(giveaway.unpaused){
                interaction.followUp({ content: `> This Giveaway Was Not Paused.` })
            } else {
                client.giveawaysManager.unpause(giveaway.messageId).then(() => {
                    interaction.followUp({content: `Done✅. Giveaway Resumed.` })
                })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (subcommand === 'edit') {
            const query = string('query');
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            const newprize = string('prize');
            const newwinnercount = integer('winnercount');

            if(newprize && newwinnercount){
                client.giveawaysManager.edit(giveaway.messageId, {
                    addTime: 5000,
                    newWinnerCount: newwinnercount,
                    newPrize: newprize
                }).then(() => {
                    interaction.followUp({content: `Done✅. Giveaway Updated.`})
                }).catch((err) => {
                    interaction.followUp({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId.', ephemeral:true});
                });
            } else if(newprize){
                client.giveawaysManager.edit(giveaway.messageId, {
                    addTime: 5000,
                    newPrize: newprize
                }).then(() => {
                    interaction.followUp({content: `Done✅. Giveaway Updated.`})
                }).catch((err) => {
                    interaction.reply({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId.', ephemeral:true});
                });
            } else if(newwinnercount){
                client.giveawaysManager.edit(giveaway.messageId, {
                    addTime: 5000,
                    newWinnerCount: newwinnercount
                }).then(() => {
                    interaction.reply({content: `Done✅. Giveaway Updated.`})
                }).catch((err) => {
                    interaction.reply({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId.', ephemeral:true});
                });
            } else {
                interaction.reply({ content: `> Choose Any Option, No Changes Were Made.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////        

        if (subcommand === 'reroll') {
            const query = string('query');
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else {
                await interaction.deferReply()
                client.giveawaysManager.reroll(giveaway.messageId).then(() => {
                    interaction.followUp({content: `Done✅. Giveaway Rerolled.` })
                })
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