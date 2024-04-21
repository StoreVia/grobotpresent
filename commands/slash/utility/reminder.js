const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Reminder extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('reminder')
				.setDescription('Set A Reminder.')
				.setDMPermission(true)
                .addStringOption(option =>
                    option.setName('time')
                        .setDescription(`Set Time For Reminder(eg:- 10s, 10min, 10h).`)
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription(`Reason For Reminder.`)
                        .setRequired(false)),
			usage: 'reminder',
			category: 'study',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
    
    let time = interaction.options.getString("time")
    let reason = interaction.options.getString("reason");
    let functions = await client.functions.reminder(interaction, time, reason);

    await interaction.deferReply({ ephemeral: true});
		return await interaction.followUp({ embeds: [functions.embed] });
	}
};