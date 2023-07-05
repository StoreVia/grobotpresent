const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessagePing extends Command {
	constructor(client) {
		super(client, {
			name: "setakilang",
  			category: "akinator",
  			alias: ["sal"],
  			cooldown: 3,
  			usage: `${process.env.prefix}sal <langCode>`,
  			description: "Set Your Akinator Language.",
		});
	}

	async run(client, message, args) {
		
        let string = args.join(" ").toLowerCase();
        let langdb = client.db.table(`akinatorlanguage`);
        let langdbcheck = await langdb.get(`${message.author.id}`);

        const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Langugae')
					.setCustomId('sallang')
					.setStyle(ButtonStyle.Secondary),
            )

		await interaction.deferReply();

        if(!args){
            message.reply({ content: `> Enter Language Code To Set Your Akinator Language.\n**Click Below Button To View All Language Codes**`, components: [buttonRow] })
        } else {
            let langCodes = ["af", "am", "ar", "az", "be", "bg", "bn", "bs", "ca", "ceb", "co", "cs", "cy", "da", "de", "el", "eo", "es", "et", "eu", "fa", "fi", "fr", "fy", "ga", "gd", "gl", "gu", "ha", "haw", "he", "hi", "hmm", "hr", "ht", "hu", "hy", "id", "ig", "is", "it", "iw", "ka", "kk", "km", "kn", "ko", "ku", "ky", "la", "lb", "lo", "lt", "lv", "mg", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my", "ne", "nl", "no", "ny", "pa", "pl", "ps", "pt", "ro", "ru", "sd", "si", "sk", "sl", "sm", "sn", "so", "sq", "sr", "st", "su", "sv", "sw", "ta", "te", "tg", "th", "tl", "tr", "uk", "ur", "uz", "vi", "xh", "yi", "yo", "zh-cn", "zh-tw", "zh", "zu"];
            if(langCodes.includes(`${string}`)){
                if(langdbcheck){
                    await langdb.set(string)
                    message.reply({ content: `> Done✅. Your Akinator Language Was Now Updated.` })
                } else {
                    await langdb.set(string)
                    message.reply({ content: `> Done✅. Your Akinator Language Was Now Set.` })
                }
            } else {
                message.reply({ content: `> Language Code Doesn't Exist. Once User "${process.env.prefix}akilangcodes" Command To Check Language Code.` })
            }
        }

	}
};