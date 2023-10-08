const { ButtonStyle } = require('discord.js');
const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageLangCodes extends Command {
	constructor(client){
		super(client, {
			name: "languagecodes",
  			category: "akinator",
  			alias: ["lc", "langcodes"],
  			cooldown: 5,
  			usage: `${process.env.prefix}langcodes`,
  			description: "See Language Codes For Akinator.",
		});
	}
	async run(client, message){

		let msgdefer = await client.functions.deferReply().message(message);
        const buttonRow = await client.functions.buttons(`Language`, `langcodes`, ButtonStyle.Secondary, `Stop`, `lcstop`, ButtonStyle.Danger);
        let msg = await msgdefer.edit({ content: `> **Click Below Button To View All Language Codes.**`, components: [buttonRow] })

        const filter = i => i.customId;
		const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
        collector.on('collect', async i => {
			if(i.user.id != message.author.id){
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} else if(i.customId === "langcodes"){
				i.reply({ content: ``, embeds: [await client.functions.akilangEmbed()], ephemeral: true })
            } else if(i.customId === "lcstop"){
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
};