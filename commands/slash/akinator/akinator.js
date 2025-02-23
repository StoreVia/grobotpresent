const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionAkinator extends Command {
    constructor(client){
        super(client, {
            data: new SlashCommandBuilder()
                .setName('akinator')
                .setDescription('Play Akinator Game.')
                .setDMPermission(true)
                .addStringOption(option =>
                    option.setName(`language`)
                        .setDescription(`In Which Language You Want To Play Akinator`)
                        .setRequired(true)
                        .setAutocomplete(true)),
            usage: 'akinator',
            category: 'akinator',
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

        const focusedValue = await client.functions.getOptions(interaction).string(`language`);
        await client.functions.akinator(interaction, focusedValue)
    }
};
