const { ButtonStyle } = require('discord.js');
const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageSetAkiLang extends Command {
	constructor(client){
		super(client, {
			name: "setakilang",
  			category: "akinator",
  			alias: ["sal"],
  			cooldown: 3,
  			usage: `${process.env.prefix}sal <langCode>`,
  			description: "Set Your Akinator Language.",
		});
	}
	async run(client, message, args){
		
        let string = args.join(" ").toLowerCase();
        let langdb = client.db.table(`akinatorlanguage`);
        let langdbcheck = await langdb.get(`${message.author.id}`);

        const buttonRow = await client.functions.buttons(`Language`, `sallang`, ButtonStyle.Secondary, `Stop`, `salstop`, ButtonStyle.Danger);

        if(!string){
            let msgdefer = await client.functions.deferReply().message(message);
            let msg = await msgdefer.edit({ content: `> Enter Language Code To Set Your Akinator Language.\n**Click Below Button To View All Language Codes.**`, components: [buttonRow] })
            collector(msg);
        } else {
            let langCodes = ["af", "am", "ar", "az", "be", "bg", "bn", "bs", "ca", "ceb", "co", "cs", "cy", "da", "de", "el", "en", "eo", "es", "et", "eu", "fa", "fi", "fr", "fy", "ga", "gd", "gl", "gu", "ha", "haw", "he", "hi", "hmm", "hr", "ht", "hu", "hy", "id", "ig", "is", "it", "iw", "ka", "kk", "km", "kn", "ko", "ku", "ky", "la", "lb", "lo", "lt", "lv", "mg", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my", "ne", "nl", "no", "ny", "pa", "pl", "ps", "pt", "ro", "ru", "sd", "si", "sk", "sl", "sm", "sn", "so", "sq", "sr", "st", "su", "sv", "sw", "ta", "te", "tg", "th", "tl", "tr", "uk", "ur", "uz", "vi", "xh", "yi", "yo", "zh-cn", "zh-tw", "zh", "zu"];
            if(langCodes.includes(`${string}`)){
                if(langdbcheck){
                    await langdb.set(`${message.author.id}`, string)
                    message.reply({ content: `> Done✅. Your Akinator Language Was Now Updated.` })
                } else {
                    await langdb.set(`${message.author.id}`, string)
                    message.reply({ content: `> Done✅. Your Akinator Language Was Now Set.` })
                }
            } else {
                let msg = await message.reply({ content: `> Language Code Doesn't Exist.\n**Click Below Button To View All Language Codes.**`, components: [buttonRow] })
                collector(msg);
            }
        }

        function collector(msg){
            const filter = i => i.customId;
		    const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
            collector.on('collect', async i => {
			    if(i.user.id != message.author.id){
				    await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			    } else if(i.customId === "sallang"){
				    await i.reply({ embeds: [await client.functions.akilangEmbed()], ephemeral: true });
                } else if(i.customId === "salstop"){
					buttonRow.components.map(component=> component.setDisabled(true));
					await i.update({ components: [buttonRow] })
				}
		    })
		    collector.on('end', async (_, reason) => {
			    if(reason === 'idle' || reason === 'user'){
				    buttonRow.components.map(component=> component.setDisabled(true));
				    return await msg.edit({ components: [buttonRow] });
			    }
		    });
        }
	}
};