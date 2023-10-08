const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = class InteractionPing extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('hug')
				.setDescription('Hug Someone.')
				.setDMPermission(true)
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Which User You Want To Hug.`)
                        .setRequired(true)),
			usage: 'user',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

    await interaction.deferReply();
    const string = await client.functions.getOptions(interaction).user(`user`);
    let attachment = await client.functions.hug();
    
    if(string === interaction.user){
      return interaction.followUp({ embeds: [await client.functions.embedBuild().description(`${interaction.user} You Can't Hug Yourselft. Come I Will Hug You 🥰.`).image(`attachment://hug.gif`).footer().build()], files: [await attachment] })
    } else {
      return interaction.followUp({ embeds: [await client.functions.embedBuild().description(`${interaction.user} Hugs ${user}, Awww How Cute 🥰.`).image(`attachment://hug.gif`).footer().build()], files: [await attachment] })
    }
	}
};