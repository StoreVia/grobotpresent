const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const ms = require("ms");

module.exports = class Reminder extends Command {
	constructor(client) {
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
	async run(client, interaction) {
        
    let user = interaction.user;
    let time = interaction.options.getString("time")
    let reason = interaction.options.getString("reason");
    let description = null;

    if(!reason) description =  `**Reminder ${user}**`;
    if(reason) description =  `**Reminder ${user} : ${reason}**`;

    setTimeout(function(){
			const reminder = new EmbedBuilder()
		    .setColor(`${process.env.ec}`)
			  .setDescription(description)
			user.send({ content:`${user}`, embeds: [reminder]})

    }, ms(time));

		const embed = new EmbedBuilder()
      .setTitle(`Reminder Started!`)
		  .setDescription(`**Ok I Will Remember You In \`${time}\`**\n> Please Make Sure Your Dm Is On.`)
		  .setColor(`${process.env.ec}`)
      .setFooter({
        text: `${client.user.username} - ${process.env.year} ©`, 
        iconURL: process.env.iconurl
      })
    await interaction.deferReply({ ephemeral: true});
		return await interaction.followUp({ embeds: [embed] });
	}
};