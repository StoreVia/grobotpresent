const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = class InteractionFootBall extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('football')
				.setDescription('Play FootBall Game.'),
			usage: 'football',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const positions = {
			left    : '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',
			middle  : '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',
			right   : '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',
		};
		let randomized = Math.floor(Math.random() * Object.keys(positions).length);
		let gameEnded = false;
		let randomPos = positions[Object.keys(positions)[randomized]];

        const componentsArray = await client.function.buttons(`Left`, `left`, ButtonStyle.Secondary, `Middle`, String(Math.random()), ButtonStyle.Primary, `Right`, `right`, ButtonStyle.Secondary);
        await interaction.deferReply();
		const msg = await interaction.followUp({ content: randomPos, components: [componentsArray] });

		function update() {
			randomized = Math.floor(Math.random() * Object.keys(positions).length);
			randomPos = positions[Object.keys(positions)[randomized]];

			msg.edit({ content: randomPos, components: [componentsArray] });
		}
		setInterval(() => {
            if(gameEnded === false){
              return update();
            } 
        }, 1000);

        const filter = i => i.customId;
     
        const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });

        collector.on('collect', async (button) => {
            if(button.user.id != interaction.user.id){
                await button.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
            }
            if(button.customId !== Object.keys(positions)[randomized]) {
                gameEnded = true;
                componentsArray.components.map(component=> component.setDisabled(true));
				await msg.edit({ components: [componentsArray] });
                return button.reply({ content: 'You Won...'});
            } else {
                gameEnded = true;
				componentsArray.components.map(component=> component.setDisabled(true));
				await msg.edit({ components: [componentsArray] });
                return button.reply({ content: 'You Lose...'});
            }
        });
        collector.on('end', async (_, reason) => {
			if (reason === 'idle' || reason === 'user') {
                gameEnded = true;
				componentsArray.components.map(component=> component.setDisabled(true));
				await interaction.editReply({ components: [componentsArray] });
			}
		});
	}
}