const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Akinator extends Command {
    constructor(client) {
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

    async autocomplete(client, interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = ['English(Recommended)', "Afghanistan", "Armenia", "Argentina", "Azerbaijan", "Belarus", "Bulgaria",  "Bangladesh", "Bosnia and Herzegovina", "Canada", "Cebuano", "Corsica",  "Czech", "Welsh", "Danish", "German", "Greek", "Esperanto", "Spanish", "Estonian",  "Basque", "Persian", "Finnish", "French", "West Frisian", "Irish", "Scottish Gaelic",  "Galician", "Gujarati", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", "Croatian",  "Haitian Creole", "Hungarian", "Armenian", "Indonesian", "Igbo", "Icelandic", "Italian",  "Hebrew (deprecated)", "Georgian", "Kazakh", "Khmer", "Kannada", "Korean", "Kurdish",  "Kyrgyz", "Latin", "Luxembourgish", "Lao", "Lithuanian", "Latvian", "Malagasy",  "Maori", "Macedonian", "Malayalam", "Mongolian", "Marathi", "Malay", "Maltese",  "Burmese", "Nepali", "Dutch", "Norwegian", "Chichewa", "Punjabi", "Polish",  "Pashto", "Portuguese", "Romanian", "Russian", "Sindhi", "Sinhala", "Slovak", "Slovenian",  "Samoan", "Shona", "Somali", "Albanian", "Serbian", "Southern Sotho", "Sundanese",  "Swedish", "Swahili", "Tamil", "Telugu", "Tajik", "Thai", "Filipino", "Turkish",  "Ukrainian", "Urdu", "Uzbek", "Vietnamese", "Xhosa", "Yiddish", "Yoruba",  "Chinese (Simplified)", "Chinese (Traditional)", "Chinese", "Zulu"];
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase()));
        const topfiltered = filtered.map(choice => ({ 
            name: choice.slice(0, 25), 
            value: choice.slice(0, 25)
        }));
        await interaction.respond(topfiltered);
    }

    async run(client, interaction) {
        interaction.reply({ content: '123' });
    }
};
