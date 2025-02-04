const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class InteractionCatsay extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('catsay')
				.setDescription('Make Cat To Say Something.')
				.setDMPermission(true)
                .addStringOption(option =>
                    option.setName('string')
                        .setDescription(`Enter Text.`)
                        .setRequired(true)),
			usage: 'catsay',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

    	await interaction.deferReply();
    	await interaction.followUp({ files: [{ attachment: `${await client.functions.catSay(await client.functions.getOptions(interaction).string(`string`))}`, name: "catsay.png" }]})
  }
};