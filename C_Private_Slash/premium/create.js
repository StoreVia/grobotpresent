const Command = require('../../structures/CommandClass');
const db = require(`quick.db`);
const { EmbedBuilder, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
var rand = require("random-key");

module.exports = class Update extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('devpremium')
				.setDescription('DEVELOPER ONLY COMMNAD.')
                .addSubcommand(subcommand =>
                    subcommand.setName(`create`)
                        .setDescription(`DEVELOPER ONLY COMMNAD.`)
                        .addStringOption(option =>
                            option.setName(`user_id`)
                                .setDescription(`DEVELOPER ONLY COMMNAD.`)
                                .setRequired(true))),
			usage: 'update',
			category: 'client',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const userId = interaction.options.getString(`user_id`);
		let subcommand = interaction.options.getSubcommand()

        if(subcommand === "create"){
            let key = rand.generate(30)
            db.set(`active_${userId}`, `${key}`)
            await interaction.deferReply()
            interaction.followUp({ content: `> Premium Create On User Id:- **${userId}**\n> Key: **${key}**` })
        }
	}
};