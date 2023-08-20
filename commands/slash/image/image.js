const Command = require('../../../structures/Commands/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Image extends Command {
	constructor(client){
		super(client, {
			data: new SlashCommandBuilder()
				.setName('image')
				.setDescription('Add Some Image Effects.')
                .addSubcommand(subcommand => 
                    subcommand.setName(`filter`)
                        .setDescription(`Choose Filter You Wan To Add.`)
                        .addStringOption(option =>
                            option.setName('category')
                                .setDescription('The Image Effect Category.')
                                .setRequired(true)
                                .addChoices(
                                    { name: 'blur', value: 'img_blur' },
                                    { name: 'gay', value: 'img_gay' },
                                    { name: 'greyscale', value: 'img_greyscale' },
                                    { name: 'invert', value: 'img_invert' },
                                    { name: 'jail', value: 'img_jail' },
                                    { name: 'sepia', value: 'img_sepia' },
                                    { name: 'trigger', value: 'img_trigger' },
                                    { name: 'wasted', value: 'img_wasted' },
                                ))
                                .addUserOption(option =>
                                    option.setName('user')
                                        .setDescription(`Which User You Want To Apply Filter.`)
                                        .setRequired(false)))
                .addSubcommand(subcommand =>
                    subcommand.setName(`youtube`)
                        .setDescription(`Make A Fake Youtube Comment.`)
                        .addStringOption(option =>
                            option.setName('text')
                                .setDescription('Enter Text You Want To Fake Comment.')
                                .setRequired(true))),
			usage: 'image',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction){

		await interaction.deferReply();
        
        const subcommand = await client.functions.getOptions(interaction).subcommand();
        const UserOption = await client.functions.getOptions(interaction).user('user') || interaction.user;
        const StringOption = await client.functions.getOptions(interaction).string("category");

        if(subcommand === "filter"){
            if(StringOption == "img_blur"){
                return await interaction.followUp({ files : [await client.functions.image(UserOption).blur()] });
            }

            if(StringOption == "img_gay"){
                return await interaction.followUp({ files : [await client.functions.image(UserOption).gay()] });
            }

            if(StringOption == "img_greyscale"){
                return await interaction.followUp({ files : [await client.functions.image(UserOption).greyScale()] });
            }

            if(StringOption == "img_invert"){
                return await interaction.followUp({ files : [await client.functions.image(UserOption).invert()] });
            }

            if(StringOption == "img_jail"){
                return await interaction.followUp({ files : [await client.functions.image(UserOption).jail()] });
            }

            if(StringOption == "img_sepia"){
                return await interaction.followUp({ files : [await client.functions.image(UserOption).sepia()] });
            }

            if(StringOption == "img_trigger"){
                return await interaction.followUp({ files : [await client.functions.image(UserOption).trigger()] });
            }

            if(StringOption == "img_wasted"){
                return await interaction.followUp({ files : [await client.functions.image(UserOption).wasted()] });
            }
        }

        if(subcommand === "youtube"){
            return await interaction.followUp({ files : [await client.functions.image(UserOption).youTube(UserOption.displayAvatarURL({ extension: 'png' }), UserOption.username, `${await client.functions.getOptions(interaction).string(`text`)}`)] });
        }
	}
};