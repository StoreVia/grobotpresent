const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = class CatchTheFish extends Command {
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
			left: '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',
			middle: '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',
			right: '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',
		};
		let randomized = Math.floor(Math.random() * Object.keys(positions).length);
		let gameEnded = false;
		let randomPos = positions[Object.keys(positions)[randomized]];

        const componentsArray = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('left')
                    .setLabel('Left')
                    .setDisabled(false)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId(String(Math.random()))
                    .setLabel(`Middle`)
                    .setDisabled(false)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('right')
                    .setLabel('Right')
                    .setDisabled(false)
                    .setStyle(ButtonStyle.Secondary)
            );

        const componentsArray1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('left')
                    .setLabel('Left')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId(String(Math.random()))
                    .setLabel(`Middle`)
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('right')
                    .setLabel('Right')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Secondary)
            );

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

        const filter = (button => {
            return button.user.id === interaction.user.id; 
        });
     
        const collector = interaction.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async (button) => {
            if(button.customId !== Object.keys(positions)[randomized]) {
                gameEnded = true;
                msg.edit({ components: [componentsArray1] })
                return button.reply({ content: 'You Won...'});
            }
            else {
                gameEnded = true;
                msg.edit({ components: [componentsArray1] })
                return button.reply({ content: 'You Lose...', components: [componentsArray1] });
            }
        });


		

	}
}