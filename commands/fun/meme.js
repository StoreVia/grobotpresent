const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const titlecase = require(`titlecase`);

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('meme')
				.setDescription('Get A Random Meme.')
				.setDMPermission(true),
			usage: 'meme',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();
		
		const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('NextMeme')
					.setCustomId('meme')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('mestop')
                	.setDisabled(false)
					.setStyle(ButtonStyle.Danger),
            )
		
		let meme = await genrateMeme()
		let message = await interaction.followUp({ embeds: [embed(meme.url, meme.memeImage, meme.title, meme.disable)], components: [buttonRow] });

		const filter = i => i.customId;
		const collector = message.createMessageComponentCollector({ filter, idle: 60000 });

        collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} 
			if(i.customId === "meme") {
				buttonRow.components.map(component=> component.setDisabled(true));
				await i.update({ content: `Searching...`, components: [buttonRow] });
				if(genrateMeme()){
					buttonRow.components.map(component=> component.setDisabled(false));
					let meme = await genrateMeme()
					i.editReply({ content: ``, embeds: [embed(meme.url, meme.memeImage, meme.title)], components: [buttonRow] });
        		}
			}
			if(i.customId === "mestop"){
				buttonRow.components.map(component=> component.setDisabled(true));
				await i.update({ components: [buttonRow] });
			}
		})

		collector.on('end', async (_, reason) => {
			if (reason === 'idle' || reason === 'user') {
				buttonRow.components.map(component=> component.setDisabled(true));
				await interaction.editReply({ components: [buttonRow] });
			}
		});

//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////

		async function genrateMeme(){
			try{
				let sub = [
					'meme',
					'me_irl',
					'memes',
					'dankmeme',
					'dankmemes',
					'ComedyCemetery',
					'terriblefacebookmemes',
					'funny'
				]
				const random = Math.floor(Math.random() * sub.length)
				const response = await fetch(`https://www.reddit.com/r/${sub[random]}/random/.json`);
				const data = await response.json();
				const children = data[0].data.children;
				const post = children[0].data;
				const perma = post.permalink;
				const url = `https://reddit.com${perma}`;
				const memeImage = post.url || post.url_overridden_by_dest;
				const title = post.title;
	
				if(!data || !data[0].data){
					return null;
				} else if(children.length === 0 || children[0].data.over_18){
					return null;
				} else {
					return {
						url, memeImage, title
					};
				}
			} catch(e) {
				let url = process.env.website;
				let memeImage = "https://i.imgur.com/lCGlrZq.png";
				let title = "Error Occured"
				console.log(e)
				return {
					url, memeImage, title
				};
			}
		}
		function embed(ur, mI, tit){
			const embed = new EmbedBuilder()
				.setTitle(`${titlecase(tit)}`)
				.setURL(`${ur}`)
				.setImage(mI)
				.setColor(`${process.env.ec}`)
				.setFooter({
					text: `${client.user.username} - ${process.env.year} ©`, 
					iconURL: process.env.iconurl
				});
			return embed;
		}

//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////

	}
};