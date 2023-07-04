const Command = require('../../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = class Help extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('help')
				.setDescription('Gives List Of Commands Of Bot.')
				.setDMPermission(true),
			usage: 'help',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		const selectMenuRow = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setPlaceholder('Select An Option')
					.setCustomId('hlpcmd')
					.setDisabled(false)
					.setMaxValues(1)
					.setOptions([
						{
							label: 'Akinator',
							value: 'akinator',
							emoji: '🧞',
						},
						{
							label: 'Chatbot',
							value: 'chatbot',
							emoji: '🤖',
						},
						{
							label: 'Fun',
							value: 'fun',
							emoji: '🎯',
						},
						{
							label: 'Mini Player Games',
							value: 'games',
							emoji: '🎮',
						},
						{
							label: 'Giveaway',
							value: 'giveaway',
							emoji: '🎉',
						},
						{
							label: 'Image',
							value: 'image',
							emoji: '🖼️',
						},
						{
							label: 'Info',
							value: 'info',
							emoji: '🌐',
						},
						{
							label: 'Ticket',
							value: 'ticket',
							emoji: '🎫',
						},
						{
							label: 'Truth Or Dare',
							value: 'tod',
							emoji: '🎭',
						},
						{
							label: 'Utility',
							value: 'utility',
							emoji: '🔨',
						},
						{
							label: 'Welcome',
							value: 'welcome',
							emoji: '👋',
						},
					]),
			);

		await interaction.deferReply();
		
		let embed = new EmbedBuilder()
  			.setTitle('Help')
			.setThumbnail(`${process.env.iconurl}`)
  			.setDescription(`Select One Of The Options Below.`)
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
     			iconURL: process.env.iconurl
   			})
        	.setColor(`${process.env.ec}`);
		const i1 = await interaction.followUp({ embeds: [embed], components: [selectMenuRow] });

		const filter = i => i.customId === 'hlpcmd';
		const collector = i1.createMessageComponentCollector({ filter, idle: 60000 });

		collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			}

			const selected = i.values[0];

			if (i.customId === 'hlpcmd') {
				let akinator = ["`/akinator`",]
				let akinatordata = akinator.join("\n");

				let chatbot = ["`/chatbot set`", "`/chatbot delete`"]
				let chatbotdata = chatbot.join("\n");

				let fun = ["`/ascii`", "`/catsay`", "`/dice`", "`/fliptext`", "`/gif`",  "`/howgay`", "`/hug`", "`/kill`", "`/meme`", "`/nitro`", "`/roast`", "`/vaportext`"]
				let fundata = fun.join("\n");

				let games = ["`/8ball`", "`/2048`", "`/catchthefish`", "`/flood`", "`/hangman`", "`/matchpairs`", "`/minesweeper`", "`/rockpapersissors`", "`/slots`", "`/snake`", "`/tictactoe`", "`/trivia`", "`/wordle`", "`/wouldyourather`" ]
				let gamesdata = games.join("\n");

				let giveaway = ["`/giveaway create`", "`/giveaway delete`", "`/giveaway edit`", "`/giveaway pause`", "`/giveaway resume`" , "`/giveaway reroll`", "`/giveaway end`"]
				let giveawaydata = giveaway.join("\n");

				let image = ["`/image filter`", "`/image youtube`"]
				let imagedata = image.join("\n");

				let info = ["`/avatar`", "`/botinfo`", "`/help`", "`/invite`", "`/membercount`", "`/ping`", "`/report`", "`/updates`", "`/userinfo`"]
				let infodata = info.join("\n");

				let ticket = ["`/ticket setup`", "`/ticket send panel`", "`/ticket edit channel`", "`/ticket edit category`", "`/ticket edit logs`", "`/ticket role`"]
				let ticketdata = ticket.join("\n");

				let tod = ["`/truth`", "`/dare`", "`/truthordare`"]
				let toddata = tod.join("\n");

				let utility = ["`/covid all`", "`/fact`", "`/google`", "`/translate`", "`/reminder`", "`/wikipedia`"]
				let utilitydata = utility.join("\n");

				let welcome = ["`/welcome guide`", "`/welcome channel set`", "`/welcome template`", "`/welcome dm user`", "`/welcome text edit`", "`/welcome background`", "`/welcome text color`", "`/welcome channel delete`", "`/welcome dm-user text-edit`"]
				let leave = ["`/leave guide`", "`/leave channel set`", "`/leave channel delete`", "`/leave text edit`"]
				let welcomedata = welcome.join("\n");
				let leavedata = leave.join("\n");

				if(selected === `akinator`){
					let akinatorembed = new EmbedBuilder()
						.setTitle(`Akinator Commands Of ${client.user.username}`)
						.setDescription(`${akinatordata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [akinatorembed]})
				}

				if(selected === `chatbot`){
					let chatbotembed = new EmbedBuilder()
						.setTitle(`Chatbot Commands Of ${client.user.username}`)
						.setDescription(`${chatbotdata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [chatbotembed]})
				}

				if(selected === `fun`){
					let funembed = new EmbedBuilder()
						.setTitle(`Fun Commands Of ${client.user.username}`)
						.setDescription(`${fundata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [funembed]})
				}

				if(selected === `games`){
					let gamesembed = new EmbedBuilder()
						.setTitle(`Game Commands Of ${client.user.username}`)
						.setDescription(`${gamesdata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [gamesembed]})
				}

				if(selected === `giveaway`){
					let imageembed = new EmbedBuilder()
						.setTitle(`Giveaway Commands Of ${client.user.username}`)
						.setDescription(`${giveawaydata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [imageembed]})
				}

				if(selected === `image`){
					let imageembed = new EmbedBuilder()
						.setTitle(`Image Commands Of ${client.user.username}`)
						.setDescription(`${imagedata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [imageembed]})
				}

				if(selected === `info`){
					let infoembed = new EmbedBuilder()
						.setTitle(`Image Commands Of ${client.user.username}`)
						.setDescription(`${infodata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [infoembed]})
				}

				if(selected === `ticket`){
					let ticketembed = new EmbedBuilder()
						.setTitle(`Ticket Commands Of ${client.user.username}`)
						.setDescription(`${ticketdata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [ticketembed]})
				}

				if(selected === `tod`){
					let todembed = new EmbedBuilder()
						.setTitle(`Truth Or Dare Commands Of ${client.user.username}`)
						.setDescription(`${toddata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [todembed]})
				}

				if(selected === `utility`){
					let utilityembed = new EmbedBuilder()
						.setTitle(`Utility Commands Of ${client.user.username}`)
						.setDescription(`${utilitydata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [utilityembed]})
				}

				if(selected === `welcome`){
					let welcomeembed = new EmbedBuilder()
						.setTitle(`Welcome Commands Of ${client.user.username}`)
						.setDescription(`**Welcome: **\n${welcomedata}\n\n**Leave: **\n${leavedata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [welcomeembed]})
				}
			}
	   	})

	   collector.on('end', async (_, reason) => {
    		if (reason === 'idle') {
				selectMenuRow.components.map(component=> component.setDisabled(true));
				await interaction.editReply({ components: [selectMenuRow] });
        	}
      	})
	}
};