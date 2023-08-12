const Command = require('../../structures/Commands/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = class Update extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('devupdate')
				.setDescription('DEVELOPER ONLY COMMNAD.'),
			usage: 'update',
			category: 'client',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		if(interaction.user.id != process.env.developer_id){
            await interaction.deferReply()
            return interaction.followUp({ content: `> Developer Only Command.` })
        }

		const update = new ModalBuilder()
			.setCustomId('myUpdate')
			.setTitle('Welcome Private Update[DEVELOPER ONLY].');
		const update1 = new TextInputBuilder()
			.setCustomId('text')
			.setLabel("Update This Text To Database.")
			.setStyle(TextInputStyle.Paragraph);
		const update0 = new ActionRowBuilder().addComponents(update1);
		update.addComponents(update0);

		interaction.showModal(update)
        
	}
};