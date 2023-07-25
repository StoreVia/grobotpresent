const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionAkinator extends Command {
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
        const choices = ['English(Recommended)', "Afghanistan", "Armenia", "Argentina", "Azerbaijan", "Belarus", "Bulgaria", "Bangladesh", "Bosnia and Herzegovina", "Canada", "Cebuano", "Corsica",  "Czech", "Welsh", "Danish", "German", "Greek", "Esperanto", "Spanish", "Estonian",  "Basque", "Persian", "Finnish", "French", "West Frisian", "Irish", "Scottish Gaelic",  "Galician", "Gujarati", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", "Croatian",  "Haitian Creole", "Hungarian", "Armenian", "Indonesian", "Igbo", "Icelandic", "Italian",  "Hebrew (deprecated)", "Georgian", "Kazakh", "Khmer", "Kannada", "Korean", "Kurdish",  "Kyrgyz", "Latin", "Luxembourgish", "Lao", "Lithuanian", "Latvian", "Malagasy",  "Maori", "Macedonian", "Malayalam", "Mongolian", "Marathi", "Malay", "Maltese",  "Burmese", "Nepali", "Dutch", "Norwegian", "Chichewa", "Punjabi", "Polish",  "Pashto", "Portuguese", "Romanian", "Russian", "Sindhi", "Sinhala", "Slovak", "Slovenian",  "Samoan", "Shona", "Somali", "Albanian", "Serbian", "Southern Sotho", "Sundanese",  "Swedish", "Swahili", "Tamil", "Telugu", "Tajik", "Thai", "Filipino", "Turkish",  "Ukrainian", "Urdu", "Uzbek", "Vietnamese", "Xhosa", "Yiddish", "Yoruba",  "Chinese (Simplified)", "Chinese (Traditional)", "Chinese", "Zulu"];
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0, 25);
        const topfiltered = filtered.map(choice => ({
            name: choice, 
            value: choice
        }));
        await interaction.respond(topfiltered);
    }

    async run(client, interaction) {

        const languageCodes = {
            'English(Recommended)': 'en',
            'Afghanistan': 'af',
            'Armenia': 'hy',
            'Argentina': 'ar',
            'Azerbaijan': 'az',
            'Belarus': 'be',
            'Bulgaria': 'bg',
            'Bangladesh': 'bn',
            'Bosnia and Herzegovina': 'bs',
            'Canada': 'ca',
            'Cebuano': 'ceb',
            'Corsica': 'co',
            'Czech': 'cs',
            'Welsh': 'cy',
            'Danish': 'da',
            'German': 'de',
            'Greek': 'el',
            'Esperanto': 'eo',
            'Spanish': 'es',
            'Estonian': 'et',
            'Basque': 'eu',
            'Persian': 'fa',
            'Finnish': 'fi',
            'French': 'fr',
            'West Frisian': 'fy',
            'Irish': 'ga',
            'Scottish Gaelic': 'gd',
            'Galician': 'gl',
            'Gujarati': 'gu',
            'Hausa': 'ha',
            'Hawaiian': 'haw',
            'Hebrew': 'he',
            'Hindi': 'hi',
            'Hmong': 'hmn',
            'Croatian': 'hr',
            'Haitian Creole': 'ht',
            'Hungarian': 'hu',
            'Armenian': 'hy',
            'Indonesian': 'id',
            'Igbo': 'ig',
            'Icelandic': 'is',
            'Italian': 'it',
            'Hebrew (deprecated)': 'iw',
            'Georgian': 'ka',
            'Kazakh': 'kk',
            'Khmer': 'km',
            'Kannada': 'kn',
            'Korean': 'ko',
            'Kurdish': 'ku',
            'Kyrgyz': 'ky',
            'Latin': 'la',
            'Luxembourgish': 'lb',
            'Lao': 'lo',
            'Lithuanian': 'lt',
            'Latvian': 'lv',
            'Malagasy': 'mg',
            'Maori': 'mi',
            'Macedonian': 'mk',
            'Malayalam': 'ml',
            'Mongolian': 'mn',
            'Marathi': 'mr',
            'Malay': 'ms',
            'Maltese': 'mt',
            'Burmese': 'my',
            'Nepali': 'ne',
            'Dutch': 'nl',
            'Norwegian': 'no',
            'Chichewa': 'ny',
            'Punjabi': 'pa',
            'Polish': 'pl',
            'Pashto': 'ps',
            'Portuguese': 'pt',
            'Romanian': 'ro',
            'Russian': 'ru',
            'Sindhi': 'sd',
            'Sinhala': 'si',
            'Slovak': 'sk',
            'Slovenian': 'sl',
            'Samoan': 'sm',
            'Shona': 'sn',
            'Somali': 'so',
            'Albanian': 'sq',
            'Serbian': 'sr',
            'Southern Sotho': 'st',
            'Sundanese': 'su',
            'Swedish': 'sv',
            'Swahili': 'sw',
            'Tamil': 'ta',
            'Telugu': 'te',
            'Tajik': 'tg',
            'Thai': 'th',
            'Filipino': 'tl',
            'Turkish': 'tr',
            'Ukrainian': 'uk',
            'Urdu': 'ur',
            'Uzbek': 'uz',
            'Vietnamese': 'vi',
            'Xhosa': 'xh',
            'Yiddish': 'yi',
            'Yoruba': 'yo',
            'Chinese (Simplified)': 'zh-CN',
            'Chinese (Traditional)': 'zh-TW',
            'Chinese': 'zh',
            'Zulu': 'zu',
        };
        const focusedValue = interaction.options.getFocused(getFull = true);
        await client.functions.akinator(interaction, languageCodes[focusedValue])
    }
};
