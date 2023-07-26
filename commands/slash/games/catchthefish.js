const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder, ButtonStyle } = require('discord.js');

module.exports = class InteractionCatchTheFish extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('catchthefish')
				.setDescription('Play CatchTheFish Game.')
        .addNumberOption(option =>
          option.setName(`count`)
            .setDescription(`Give Number Of Fishes You Want To Catch.(enter number less than or equal to 10)`)
            .setRequired(true)),
			usage: 'catchthefish',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    let count = await client.functions.getOptions(interaction).number(`count`);

    if(count > 10){ 
		  await interaction.deferReply({ ephemeral: true });
      await interaction.followUp({ content: "Number Should Be Less Than Or Equal To 10." })
    } else {
      const componentsArray = await client.functions.buttons(`Stop`, `e`, ButtonStyle.Danger, `🎣`, `${String(Math.random())}`, ButtonStyle.Primary, `Stop`, `ee`, ButtonStyle.Danger);
      await interaction.deferReply();
      let msg = await interaction.followUp({ content: `Catch ${count} Fishes To Win!\n\n${await client.functions.games().ctfRandom().randomPos}`, components: [componentsArray] })
      await client.functions.games().catchTheFish(msg, count, componentsArray, interaction.user.id);
    }
	}
}