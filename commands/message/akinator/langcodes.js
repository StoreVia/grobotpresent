const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageLangCodes extends Command {
	constructor(client) {
		super(client, {
			name: "languagecodes",
  			category: "akinator",
  			alias: ["lc", "langcodes"],
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
				await i.reply({ embeds: [await client.functions.akilangEmbed(client.user.username)], ephemeral: true });
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