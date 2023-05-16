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
                            option.setName('message_id')
                            .setDescription('Enter Giveaway Message Id.')
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
                            option.setName('message_id')
                                .setDescription('Enter Giveaway Message Id.')
                                .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('resume')
                        .setDescription('Resume A Giveaways.')
                        .addStringOption(option =>
                            option.setName('message_id')
                                .setDescription('Enter Giveaway Message Id.')
                                .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`reroll`)
                        .setDescription(`Reroll A Giveaway`)
                        .addStringOption(option =>
                            option
                                .setName(`message_id`)
                                .setDescription(`Enter Giveaway Message Id.`)
                                .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('edit')
                        .setDescription('Edit A Giveaway.')
                        .addStringOption(option =>
                            option.setName('message_id')
                                .setDescription('Enter Giveaway Message Id.')
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

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            return await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            return await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command.`, ephemeral: true})
        }

        if (interaction.options.getSubcommand() === 'create') {
            const channel = interaction.options.getChannel('channel');
            const duration1 = interaction.options.getString('duration');
            const duration = ms(duration1)
            const winnerCount = interaction.options.getInteger('winnercount');
            const prize = interaction.options.getString('prize');
            return client.giveawaysManager.start(channel, {
                prize,
                duration,
                winnerCount,
                messages,
                hostedBy: interaction.user,
            }).then(() => {
                interaction.reply({content: `Done✅. Giveaway Started In ${channel}`, ephemeral: true})
            }).catch((err) => {
                interaction.reply({ content: '> Failed To Start Giveaway. Please Make Sure You Have Entered Correct Details.', ephemeral:true})
            })
        }

        if (interaction.options.getSubcommand() === 'delete') {
            const messageId = interaction.options.getString('message_id');
            client.giveawaysManager.delete(messageId).then(() => {
                interaction.reply({content: `Done✅. Giveaway Deleted.`, ephemeral: true})
              }).catch((err) => {
                interaction.reply({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId.', ephemeral:true});
            });
        }

        if (interaction.options.getSubcommand() === 'end') {
            const query = interaction.options.getString(`query`);
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                await interaction.deferReply({ ephemeral: true })
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else if(giveaway.ended){
                await interaction.deferReply({ ephemeral: true })
                interaction.followUp({ content: `> This Giveaway Has Been Already Ended.` })
            } else {
                await interaction.deferReply()
                client.giveawaysManager.end(giveaway.messageId).then(() => {
                    interaction.followUp({content: `Done✅. Giveaway Ended.` })
                })
            }
        }

        if (interaction.options.getSubcommand() === 'pause') {
            const messageId = interaction.options.getString('message_id');
            client.giveawaysManager.pause(messageId).then(() => {
                interaction.reply({content: `Done✅. Giveaway Paused.`, ephemeral: true})
            }).catch((err) => {
                interaction.reply({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId.', ephemeral:true});
            });
        }

        if (interaction.options.getSubcommand() === 'resume') {
            const messageId = interaction.options.getString('message_id');
            client.giveawaysManager.unpause(messageId).then(() => {
                interaction.reply({content: `Done✅. Giveaway Resumed.`, ephemeral: true})
            }).catch((err) => {
                interaction.reply({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId.', ephemeral:true});
            });
        }

        if (interaction.options.getSubcommand() === 'edit') {
            const messageId = interaction.options.getString('message_id');
            const newprize = interaction.options.getString('prize');
            const newwinnercount = interaction.options.getInteger('winnercount');

            if(newprize && newwinnercount){
                client.giveawaysManager.edit(messageId, {
                    addTime: 5000,
                    newWinnerCount: newwinnercount,
                    newPrize: newprize
                }).then(() => {
                    interaction.reply({content: `Done✅. Giveaway Updated.`, ephemeral: true})
                }).catch((err) => {
                    interaction.reply({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId.', ephemeral:true});
                });
            } else if(newprize){
                client.giveawaysManager.edit(messageId, {
                    addTime: 5000,
                    newPrize: newprize
                }).then(() => {
                    interaction.reply({content: `Done✅. Giveaway Updated.`, ephemeral: true})
                }).catch((err) => {
                    interaction.reply({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId.', ephemeral:true});
                });
            } else if(newwinnercount){
                client.giveawaysManager.edit(messageId, {
                    addTime: 5000,
                    newWinnerCount: newwinnercount
                }).then(() => {
                    interaction.reply({content: `Done✅. Giveaway Updated.`, ephemeral: true})
                }).catch((err) => {
                    interaction.reply({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId.', ephemeral:true});
                });
            } else {
                interaction.reply({ content: `> Choose Any Option, No Changes Were Made.`, ephemeral: true })
            }
        }

        if (interaction.options.getSubcommand() === 'reroll') {
            const messageId = interaction.options.getString('message_id');
            client.giveawaysManager.reroll(messageId).then(() => {
                interaction.reply({content: `Done✅. Giveaway Rerolled.`, ephemeral: true})
            }).catch((err) => {
                interaction.reply({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId.', ephemeral:true});
            });
        }
	}
};