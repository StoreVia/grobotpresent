const Command = require('../../../structures/MessageCommandClass');
const { ButtonStyle } = require('discord.js');

module.exports = class MessageGiveawayCreate extends Command {
	constructor(client){
		super(client, {
			name: "gcreate",
  			category: "giveaway",
  			alias: ["gc", "giveawaycreate"],
  			cooldown: 3,
  			usage: `${process.env.prefix}gcreate`,
  			description: "Create A Giveaway.",
		});
	}
	async run(client, message){

        /** let channel = null;
        let prize = null;
        let duration = null;
        let winnercount = null;
        let hosted = null; */
		let buttonRow = await client.functions.buttons(`Fill`, "gcfill", ButtonStyle.Secondary, "Cancel", "gccancel", ButtonStyle.Danger);
        let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else {
			let msg = await msgdefer.edit({ content: `> Click Below Button To Fill Giveaway Details.`, components: [buttonRow] });
			const filter = i => i.customId;
			const collector = msg.createMessageComponentCollector({ filter, idle: 60000 })

			collector.on('collect', async i => {
				if(i.user.id != message.author.id){
					return await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
				} else if(i.customId === "gcfill"){
					const description = new ModalBuilder()
                		.setCustomId('myModalDescription')
                		.setTitle('Ticket System Configuration.')
                		.addComponents(
							new ActionRowBuilder()
								.addComponents(
									new TextInputBuilder()
                                		.setCustomId('text')
                                		.setLabel("Set Ticket Panel Embed Description.")
                                		.setStyle(TextInputStyle.Paragraph)))
										
				} else if(i.customId === "gccancel"){
					buttonRow.components.map(component=> component.setDisabled(true));
					return await i.update({ components: [buttonRow] })
				}
			})
			collector.on('end', async (_, reason) => {
				if(reason === 'idle' || reason === 'user'){
					buttonRow.components.map(component=> component.setDisabled(true));
					await msg.edit({ components: [buttonRow] });
				}
			});
		}
	}
};