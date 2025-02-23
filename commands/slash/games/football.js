const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder, ButtonStyle } = require('discord.js');

module.exports = class InteractionFootBall extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('football')
				.setDescription('Play FootBall Game.'),
			usage: 'football',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){
        
        const componentsArray = await client.functions.buttons(`Left`, `left`, ButtonStyle.Secondary, `Middle`, String(Math.random()), ButtonStyle.Primary, `Right`, `right`, ButtonStyle.Secondary);
        await interaction.deferReply();
		const msg = await interaction.followUp({ content: await client.functions.games().footBallRandom().randomPos, components: [componentsArray] });
        await client.functions.games().footBall(msg, componentsArray, interaction.user.id);
	}
}