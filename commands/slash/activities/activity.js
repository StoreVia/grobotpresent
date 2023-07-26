const Command = require('../../../structures/CommandClass');
const { SlashCommandBuilder  } = require('discord.js');

module.exports = class InteractionActivity extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('activity')
				.setDescription('Use Disocrd Activities.')
                .addStringOption(option =>
                    option.setName(`name`)
                        .setRequired(true)
                        .setDescription(`Select The Activity You Want To Launch.`)
                        .addChoices(
                            { name: 'Youtube', value: 'youtube' },
                    		{ name: 'Poker Night', value: 'poker' },
                    		{ name: 'Jamspace', value: 'jamspace' },
							{ name: 'Putt Party', value: 'puttparty' },
                    		{ name: 'Gartic Phone', value: 'garticphone' },
                    		{ name: 'Know What I Meme', value: 'kwim' },
                            { name: 'Chess In The Park', value: 'chess' },
                            { name: 'Bobble Leauge', value: 'bobble' },
                            { name: 'Land-io', value: 'landio' },
                            { name: 'Sketch Heads', value: 'sketchheads' },
                            { name: 'Blazing 8s', value: 'blazing8' },
                            { name: 'SpellCast', value: 'spellcast' },
                            { name: 'Checkers In The Park', value: 'checkers' },
                            { name: 'Letter League', value: 'lettertile' },
                        )),
			usage: 'activity',
			category: 'activity',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links', 'Manage Guild'],
		});
	}
	async run(client, interaction) {

        let channel = await client.functions.voiceChannel().interaction(interaction);
        let activity = await client.functions.getOptions(interaction).string("name");

        if(!channel){
            await interaction.deferReply({ ephemeral: true });
            return interaction.followUp({ content: `${await client.functions.errorMsg().vc()}.`})
        } else {
            await interaction.deferReply();
            return interaction.followUp({ content: `${await client.functions.discordActivity(channel.id, `${activity}`)}`})
        }
        
	}
};