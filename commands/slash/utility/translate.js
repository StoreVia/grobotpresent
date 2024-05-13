const Command = require('../../../structures/Commands/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Translate extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('translate')
				.setDescription('Translate Some Text From English To Other Language.')
                .addStringOption(option =>
                    option.setName('text')
                        .setDescription(`Text You Want To Translate.`)
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('language')
                        .setDescription('In Which Language You Want To Translate Text.')
                        .setRequired(true)
                        .setAutocomplete(true)),
			usage: 'translate',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}

    async autocomplete(client, interaction){
        
        const focusedValue = interaction.options.getFocused();
        const languages = require(`../../../A_Jsons/languages.json`);
        const filtered = Object.entries(languages).filter(([code, language]) => language.toLowerCase().includes(focusedValue.toLowerCase())).slice(0, 25).map(([code, language]) => ({ name: language, value: code }));
        await interaction.respond(filtered);
    }

	async run(client, interaction){

		await interaction.deferReply();

        const text = await client.functions.getOptions(interaction).string('text');
        const language = await client.functions.getOptions(interaction).string("language");
        const functions = await client.functions.translate(language, text);
        return interaction.followUp({ embeds: [functions] });
	}
};