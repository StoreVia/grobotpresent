const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType } = require('discord.js');
messages = require('../../../giveawayUtility/message');
const ms = require('ms');

module.exports = class Giveaway extends Command {
	constructor(client){
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
                                .setRequired(true))
                        .addUserOption(option =>
                            option.setName('hosted')
                                .setDescription('Select Host Or Leave It.')
                                .setRequired(false)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('delete')
                        .setDescription('Delete A Giveaway.')
                        .addStringOption(option =>
                            option.setName('query')
                            .setDescription('Enter Giveaway Message Id Or Prize.')
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
	async run(client, interaction){
        
        await interaction.deferReply({ ephemeral: true })
        let subcommand = await client.functions.getOptions(interaction).subcommand();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            return await interaction.followUp({ content: `> You Need "Manage Guild" Permission To Use This Command`})
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === 'create'){
            const channel = await client.functions.getOptions(interaction).channel('channel');
            const duration1 = await client.functions.getOptions(interaction).string('duration');
            const duration = ms(duration1)
            const winnerCount = await client.functions.getOptions(interaction).integer('winnercount');
            const prize = await client.functions.getOptions(interaction).string('prize');
            const hosted = await client.functions.getOptions(interaction).user('hosted');
            await client.functions.giveaway().start(channel, prize, duration, winnerCount, hosted || interaction.user);
            return interaction.followUp({ content: `> Done✅. Giveaway Started In ${channel}` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === 'delete'){
            const query = await client.functions.getOptions(interaction).string(`query`);
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else {
                await client.functions.giveaway().delet(giveaway.messageId);
                interaction.followUp({content: `> Done✅. Giveaway Deleted.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === 'end'){
            const query = await client.functions.getOptions(interaction).string(`query`);
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else if(giveaway.ended){
                interaction.followUp({ content: `> This Giveaway Has Been Already Ended. Else Try By Entering Message Id.` })
            } else {
                client.giveawaysManager.end(giveaway.messageId).then(() => {
                    interaction.followUp({content: `> Done✅. Giveaway Ended.` })
                }).catch((e) => {
                    if(e.includes(`already ended`)){
                        interaction.followUp({ content: `> Please Try To Enter Message Id As There Are Many Giveaway's With The Same Prize.` })
                    } 
                })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === 'pause'){
            const query = await client.functions.getOptions(interaction).string('query');
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else {
                client.giveawaysManager.pause(giveaway.messageId).then(() => {
                    interaction.followUp({content: `> Done✅. Giveaway Paused.` })
                }).catch((e) => {
                    if(e.includes(`already paused`)){
                        interaction.followUp({ content: `> This Giveaway Has Been Already Paused.` })
                    } else if(e.includes(`already ended`)){
                        interaction.followUp({ content: `> Please Try To Enter Message Id As There Are Many Giveaway's With The Same Prize.` })
                    } 
                })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === 'resume'){
            const query = await client.functions.getOptions(interaction).string('query');
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.` })
            } else {
                client.giveawaysManager.unpause(giveaway.messageId).then(() => {
                    interaction.followUp({content: `> Done✅. Giveaway Resumed.` })
                }).catch((e) => {
                    if(e.includes(`not paused`)){
                        interaction.followUp({ content: `> This Giveaway Has Been Already Paused.` })
                    } else if(e.includes(`already ended`)){
                        interaction.followUp({ content: `> Please Try To Enter Message Id As There Are Many Giveaway's With The Same Prize.` })
                    } 
                })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === 'edit'){
            const query = await client.functions.getOptions(interaction).string('query');
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            const newprize = await client.functions.getOptions(interaction).string('prize');
            const newwinnercount = await client.functions.getOptions(interaction).integer('winnercount');

            if(newprize && newwinnercount){
                client.giveawaysManager.edit(giveaway.messageId, {
                    addTime: 5000,
                    newWinnerCount: newwinnercount,
                    newPrize: newprize
                }).then(() => {
                    interaction.followUp({content: `> Done✅. Giveaway Updated.`})
                }).catch((err) => {
                    interaction.followUp({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.', ephemeral:true});
                });
            } else if(newprize){
                client.giveawaysManager.edit(giveaway.messageId, {
                    addTime: 5000,
                    newPrize: newprize
                }).then(() => {
                    interaction.followUp({content: `> Done✅. Giveaway Updated.`})
                }).catch((err) => {
                    interaction.followUp({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.', ephemeral:true});
                });
            } else if(newwinnercount){
                client.giveawaysManager.edit(giveaway.messageId, {
                    addTime: 5000,
                    newWinnerCount: newwinnercount
                }).then(() => {
                    interaction.followUp({content: `> Done✅. Giveaway Updated.`})
                }).catch((err) => {
                    interaction.reply({ content: '> No Giveaway Found. Please Make Sure You Have Entered Correct MessageId/Prize.', ephemeral:true});
                });
            } else {
                interaction.followUp({ content: `> You Need To Select Atleast One Option To Run This Command.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////        

        if(subcommand === 'reroll'){
            const query = await client.functions.getOptions(interaction).string('query');
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
            if(!giveaway){
                interaction.followUp({ content: `> No Giveaway Found. Please Make Sure You Have Entered Correct Query (or) Try By Entering MessageId.` })
            } else if(!giveaway.ended){
                interaction.followUp({ content: `> The Giveaway isn't Ended To Reroll.` })
            }else {
                client.giveawaysManager.reroll(giveaway.messageId).then(() => {
                    interaction.followUp({content: `> Done✅. Giveaway Rerolled.` })
                })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	}
};