const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionCollector } = require('discord.js');
const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessagePing extends Command {
	constructor(client) {
		super(client, {
			name: "langcodes",
  			category: "akinator",
  			alias: ["lc"],
  			cooldown: 3,
  			usage: `${process.env.prefix}langcodes`,
  			description: "See Language Codes For Akinator.",
		});
	}

	async run(client, message) {

        const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Language')
					.setCustomId('langcodes')
					.setStyle(ButtonStyle.Secondary),
            )

        
        let msg = await message.reply({ content: `> **Click Below Button To View All Language Codes.**`, components: [buttonRow] })

        const filter = i => i.customId;
		const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
        collector.on('collect', async i => {
			if (i.user.id != message.author.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} else if(i.customId === "langcodes") {
                let embed = new EmbedBuilder()
  					.setTitle('All Language Codes')
  					.setDescription(`**Usage: **\`${process.env.prefix}setakilang <langCode>\`\n\nen - English(Recommended)\naf - Afghanistan\nam - Armenia\nar - Argentina\naz - Azerbaijan\nbe - Belarus\nbg - Bulgaria\nbn - Bangladesh\nbs - Bosnia and Herzegovina\nca - Canada\nceb - Cebuano\nco - Corsica\ncs - Czech\ncy - Welsh\nda - Danish\nde - German\nel - Greek\neo - Esperanto\nes - Spanish\net - Estonian\neu - Basque\nfa - Persian\nfi - Finnish\nfr - French\nfy - West Frisian\nga - Irish\ngd - Scottish Gaelic\ngl - Galician\ngu - Gujarati\nha - Hausa\nhaw - Hawaiian\nhe - Hebrew\nhi - Hindi\nhmm - Hmong\nhr - Croatian\nht - Haitian Creole\nhu - Hungarian\nhy - Armenian\nid - Indonesian\nig - Igbo\nis - Icelandic\nit - Italian\niw - Hebrew (deprecated)\nka - Georgian\nkk - Kazakh\nkm - Khmer\nkn - Kannada\nko - Korean\nku - Kurdish\nky - Kyrgyz\nla - Latin\nlb - Luxembourgish\nlo - Lao\nlt - Lithuanian\nlv - Latvian\nmg - Malagasy\nmi - Maori\nmk - Macedonian\nml - Malayalam\nmn - Mongolian\nmr - Marathi\nms - Malay\nmt - Maltese\nmy - Burmese\nne - Nepali\nnl - Dutch\nno - Norwegian\nny - Chichewa\npa - Punjabi\npl - Polish\nps - Pashto\npt - Portuguese\nro - Romanian\nru - Russian\nsd - Sindhi\nsi - Sinhala\nsk - Slovak\nsl - Slovenian\nsm - Samoan\nsn - Shona\nso - Somali\nsq - Albanian\nsr - Serbian\nst - Southern Sotho\nsu - Sundanese\nsv - Swedish\nsw - Swahili\nta - Tamil\nte - Telugu\ntg - Tajik\nth - Thai\ntl - Filipino\ntr - Turkish\nuk - Ukrainian\nur - Urdu\nuz - Uzbek\nvi - Vietnamese\nxh - Xhosa\nyi - Yiddish\nyo - Yoruba\nzh-cn - Chinese (Simplified)\nzh-tw - Chinese (Traditional)\nzh - Chinese\nzu - Zulu `)
  					.setFooter({
      					text: `${client.user.username} - ${process.env.year} ©`, 
      					iconURL: process.env.iconurl
    				})
        			.setColor(`${process.env.ec}`);
				await i.reply({ embeds: [embed], ephemeral: true });
            }
		})
		collector.on('end', async (_, reason) => {
			if (reason === 'idle' || reason === 'user') {
				buttonRow.components.map(component=> component.setDisabled(true));
				return await msg.edit({ components: [buttonRow] });
			}
		});
	}
};