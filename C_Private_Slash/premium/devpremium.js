const Command = require('../../structures/CommandClass');
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
                        .setDescription(`DEVELOPER ONLY COMMAND.`))
                .addSubcommand(subcommand => 
                    subcommand.setName(`active-keys`)
                        .setDescription(`DEVELOPER ONLY COMMAND.`)),
			usage: 'update',
			category: 'client',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        if(interaction.user.id != process.env.developer_id){
            await interaction.deferReply()
            return interaction.followUp({ content: `> Developer Only Command.` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const keys = client.db.table('premium')
        const usedkeys = client.db.table('premiumused')
		let subcommand = interaction.options.getSubcommand()
        let keyscheck = await keys.get(`premium`)
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "create"){
            let key = rand.generate(30)
            if(!keyscheck){
                await keys.push(`premium.keys`, `${key}` )
                await interaction.deferReply()
                interaction.followUp({ content: `> Premium Table Create With Starting Key: **${key}**` })
            } else {
                await keys.push(`premium.keys`, `${key}` )
                await interaction.deferReply()
                interaction.followUp({ content: `> Added New Premium Key To Table: **${key}**` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "active-keys"){
            let array = await keys.get(`premium.keys`);
            let filterarray = await usedkeys.get(`premium.keys`);
            let arrayKeys = Array.isArray(array) ? array : [];
            let filterarrayKeys = Array.isArray(filterarray) ? filterarray : [];
            let filteredKeys = arrayKeys.filter(key => !filterarrayKeys.some(usedKey => usedKey === key));

            await interaction.deferReply()
            interaction.followUp({ content: `Acitve Keys:\n> ${filteredKeys.length ? filteredKeys.join("\n> ") : "None"}` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	}
};