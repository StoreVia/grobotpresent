const Event = require('../../structures/EventClass');
const { InteractionType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const Discord = require(`discord.js`)
const { getPasteUrl, PrivateBinClient } = require('@agc93/privatebin');
const ms = require("parse-ms-2");
var rand = require("random-key");

module.exports = class InteractionCreate extends Event {
	constructor(client) {
		super(client, {
			name: 'interactionCreate',
			category: 'guild',
		});
	}
	async run(interaction) {

		const client = this.client;
		
//commandruneventstart
		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = client.commands.get(interaction.commandName);
			if(interaction.user.bot) {
				return;
			}
			if(!interaction.inGuild() && interaction.type === InteractionType.ApplicationCommand){
				await interaction.deferReply();
				return await interaction.followUp({ content: '> Slash Commands Can Only Be Used In Server/Guilds.' });
			}
			if(!command){
				await interaction.deferReply();
				return await interaction.followUp({ content: `> This Isn't Avilable For Now.`, ephemeral: true }) && client.commands.delete(interaction.commandName);
			}
			try {
				const activatedkey = client.db.table(`premiumactivated`)
				let userpremiumcheck = await activatedkey.get(`${interaction.user.id}`)
				if(command.description.includes(`premium`)){
					if(userpremiumcheck){
						let [key, time] = userpremiumcheck.keyandtime.split(',');
						if(process.env.premium_timeout - (Date.now() - time.trim()) < 0){
							await interaction.deferReply({ ephemeral: true })
							interaction.followUp({ content: `> Your Premium Subscription Is Expired. Renew It Buy Using "/premium buy" Command.(Applied Charges)` })
						} else {
							let updatedb = client.db.table(`updates`)
							let update = await client.db.get(`update`)
							let updatecheck = await updatedb.get(`${interaction.user.id}`)
							if(!update){
								command.run(client, interaction);
							} else if(update){
								let [text, id] = update.textandid.split(',');
								if(updatecheck != id.trim()){
									interaction.channel.send({ content: `${interaction.user}, You Have A Unread Message. Use "/updates" Command To Check The Message.` })
									command.run(client, interaction);
									updatedb.set(`${interaction.user.id}`, `${id.trim()}`)
								} else if(updatecheck === id.trim()){
									command.run(client, interaction);
								}
							}
						}
					} else {
						await interaction.deferReply({ ephemeral: true })
						interaction.followUp({ content: `> This Command Is For Only Premium Users.` })
					}
				} else {
					let updatedb = client.db.table(`updates`)
					let update = await client.db.get(`update`)
					let updatecheck = await updatedb.get(`${interaction.user.id}`)
					if(!update){
						command.run(client, interaction);
					} else if(update){
						let [text, id] = update.textandid.split(',');
						if(updatecheck != id.trim()){
							interaction.channel.send({ content: `${interaction.user}, You Have A Unread Message. Use "/updates" Command To Check The Message.` })
							command.run(client, interaction);
							updatedb.set(`${interaction.user.id}`, `${id.trim()}`)
						} else if(updatecheck === id.trim()){
							command.run(client, interaction);
						}
					}
				}
			} catch (e) {
				console.log(e);
				await interaction.deferReply({ ephemeral: true });
				return await interaction.followUp({ content: `> An Error Has Occured.` });
			}
		} else if (interaction.isAutocomplete()) {
			const command = interaction.client.commands.get(interaction.commandName);
	
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
			try {
				await command.autocomplete(client, interaction);
			} catch (error) {
				console.error(error);
			}
		}
	
//commandruneventend

//welcomestart
		const welcomedb = client.db.table(`welcome`);
		const welcomecheck = await welcomedb.get(`${interaction.guild.id}`);

		if(interaction.customId === 'WelcomeTextSet') {
    		await interaction.reply({ content: `> Done✅. Welcome Channel Was Now Set And Text Updated.`, ephemeral: true })
    		.then(() => {
      			const text = interaction.fields.getTextInputValue('text');
      			welcomedb.set(`${interaction.guild.id}`, {
					
				})
    		})
  		}
		if(interaction.customId === 'myModalWelcomeTextEdit') {
			await interaction.reply({ content: `> Done✅. Welcome Channel Text Now Updated.`, ephemeral: true })
			.then(() => {
				const text1 = interaction.fields.getTextInputValue('text1');
				db.set(`welcometext_${interaction.guild.id}`, text1)
			})
		}
		if(interaction.customId === 'myModalDmUserNew') {
			await interaction.reply({ content: `> Done✅. Welcome User Dm Was Now Set.`, ephemeral: true })
			.then(() => {
				const text2 = interaction.fields.getTextInputValue('text2');
				db.set(`welcomedmtext_${interaction.guild.id}`, text2)
			})
		}
		if(interaction.customId === 'myModalDmUserTextEdit') {
			await interaction.reply({ content: `> Done✅. User Dm Text Message Was Now Updated.`, ephemeral: true })
			.then(() => {
				const text3 = interaction.fields.getTextInputValue('text3');
				db.set(`welcomedmtext_${interaction.guild.id}`, text3)
			})
		}
		if(interaction.customId === "myModalLeaveNew"){
			await interaction.reply({ content: `> Done✅. Leave Channel Was Now Set.`, ephemeral: true })
    		.then(() => {
      			const text = interaction.fields.getTextInputValue('text');
      			db.set(`leavetext_${interaction.guild.id}`, text)
    		})
		}
		if(interaction.customId === "myModalLeaveOld"){
			await interaction.reply({ content: `> Done✅. Leave Channel Was Now Updated.`, ephemeral: true })
			.then(() => {
				const text = interaction.fields.getTextInputValue('text');
				db.set(`leavetext_${interaction.guild.id}`, text)
			})
		}
		if(interaction.customId === "myModalLeaveEditText"){
			await interaction.reply({ content: `> Done✅. User Leave Text Was Now Updated.`, ephemeral: true })
			.then(() => {
				const text1 = interaction.fields.getTextInputValue('text1');
				db.set(`leavetext_${interaction.guild.id}`, text1)
			})
		}
//welcomeend

//privateslashstart
		if(interaction.customId === "myUpdate"){
			await interaction.reply({ content: `> Done✅. Update Text To Database.`, ephemeral: true })
			.then(async() => {
				let updatecheck = await client.db.get(`update`)
				let updateid = rand.generate(10)
				const updatetext = interaction.fields.getTextInputValue('text');
				if(updatecheck){
					client.db.set(`update`, { textandid: `${updatetext}, ${updateid}`})
				} else if(!updatecheck){
					client.db.set(`update`, { textandid: `${updatetext}, ${updateid}`})
				}
			})
		}
//privateslashend

//ticketstart
		const ticketdb = client.db.table(`ticket`)
		const ticketblockdb = client.db.table(`ticketblock`)
		let ticketcheck = await ticketdb.get(`${interaction.guild.id}`)
		let ticketblockcheck = await ticketblockdb.get(`${interaction.guild.id}`)
		let ticketblockarray = Array.isArray(ticketblockcheck) ? ticketblockcheck : [];

		if(interaction.customId === 'ticketopen') {
			if(!ticketcheck){
				if(interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
					await interaction.deferReply({ ephemeral: true })
					return await interaction.followUp({ content: `> Ticket System Was Not Setup. Use "/ticket setup" To Setup Ticket System.` })
				} else {
					await interaction.deferReply({ ephemeral: true })
					return await interaction.followUp({ content: `> This Guild Didn't Setup Ticket System. Please Contact Mod.` })
				}
			 } else if(ticketcheck){
				await interaction.deferReply({ ephemeral: true })
				try{
					if(ticketblockcheck.includes(`${interaction.user.id}`)){
						await interaction.followUp({ content: `> You Are Blocked From Creating Ticket.` })
					} else if(!ticketblockcheck.includes(`${interaction.user.id}`)){
						ticketOpen()
					}
				} catch(e) {
					ticketOpen()
				}
			}
		}
		if(interaction.customId === "closeticket"){
			const role = ticketcheck.details.supportRole;
			const row = new Discord.ActionRowBuilder()
				.addComponents(
		 			new Discord.ButtonBuilder()
						.setLabel('Continue')
						.setEmoji(`✅`)
						.setCustomId('ticontinue')
						.setStyle(Discord.ButtonStyle.Success),
		  			new Discord.ButtonBuilder()
						.setLabel('Stop')
						.setEmoji(`🛑`)
						.setCustomId('tistop')
						.setStyle(Discord.ButtonStyle.Danger),
				);
			await interaction.deferReply()
			await interaction.followUp({ content: `<@&${role}>, ${interaction.user} Has Requested For Closing Ticket Please Confirm Before Deleting.`, components: [row]})
  		}
		if(interaction.customId === "ticontinue"){
			const role = ticketcheck.details.supportRole;
			const logs = ticketcheck.details.ticketLogs;
			const guild = client.guilds.cache.get(interaction.guild.id);
			const logschannel = guild.channels.cache.get(logs);
			if(!interaction.member.roles.cache.has(`${role}`)){
				await interaction.deferReply({ ephemeral: true })
				await interaction.followUp({ content: `> You Don't Have Permission\n> Require <@&${role}>.` })
		  	} else if(interaction.member.roles.cache.has(`${role}`)){
				if(!ticketcheck){
					await interaction.deferReply({ ephemeral: true })
					if(interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
						return await interaction.followUp({ content: `> You Have Not Setup Ticket System Yet. Use "/ticket setup" Command To Setup Ticket System.` })
					} else {
						return await interaction.followUp({ content: `> This Guild Doesn't Have Active Ticket System. Please Contact Mod.` })
					}
				} else if(ticketcheck){
					await interaction.deferReply()
					await interaction.followUp({ content: `> Saving Messages Please Wait...` })

					interaction.channel.messages.fetch().then(async (messages) => {
						let a = messages.filter(m => m.author.bot !== true).map(m =>
							`\n ${new Date(m.createdTimestamp).toLocaleString('en-EN')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
						).reverse().join('\n');
						if (a.length < 1) a = "Nothing"
						var paste = new PrivateBinClient("https://privatebin.net/");
						var result = await paste.uploadContent(a, {uploadFormat: 'markdown'})

						const embed = new EmbedBuilder()
							.setTitle('Ticket Logs')
							.setDescription(`To See Logs Of The Ticket Created By <@!${interaction.channel.topic}> [ClickHere](${getPasteUrl(result)})`)
							.addFields(
								{ name: `**CreatedBy: **`, value: `<@!${interaction.channel.topic}>`, inline: true },
								{ name: `**ClosedBy: **`, value: `<@!${interaction.user.id}>`, inline: true }
								)
								.setColor(`${process.env.ec}`)
								.setFooter({
									text: `Link Expires In 6 Days From Now.`,
									iconURL: process.env.iconurl
								})
								.setTimestamp();

						logschannel.send({ embeds: [embed] }).then(() => {
							interaction.channel.delete()
						})
					}).catch(async(e) => {
						const embed = new EmbedBuilder()
							.setTitle('Ticket Logs')
							.setDescription(`Error In Creating Logs.**Please Try Later/Report By Using "/report" If You Think This Is A Bug.**`)
							.addFields(
								{ name: `**CreatedBy: **`, value: `<@!${interaction.channel.topic}>`, inline: true },
								{ name: `**ClosedBy: **`, value: `<@!${interaction.user.id}>`, inline: true }
							)
							.setColor(`${process.env.ec}`)
							.setFooter({
								text: `Link Expires In 6 Days From Now.`,
								iconURL: process.env.iconurl
							})
							.setTimestamp();

						logschannel.send({ embeds: [embed] }).then(() => {
							interaction.channel.delete();
				  		})
			  		})
				}
		  	}
  		}
		if(interaction.customId === "tistop"){
			interaction.message.delete();
		}
		if(interaction.customId === "myModalDescription"){
			const description = interaction.fields.getTextInputValue('text');
			const ticketdb = client.db.table(`ticket`)
        	const ticketembeddb = client.db.table(`ticketembed`)
        	let ticketcheck = await ticketdb.get(`${interaction.guild.id}`)
        	let ticketembedcheck = await ticketembeddb.get(`${interaction.guild.id}`)
            if(!ticketcheck){
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `> You Have Not Setup Ticket System Yet. Use "/ticket setup" Command To Setup Ticket System.` })
            } else {
				let title1 = ticketembedcheck?.title || null;
				let thumbnail12 = ticketembedcheck?.thumbnail || null;
                ticketembeddb.set(`${interaction.guild.id}`, {
                    title: title1,
                    description: description,
                    thumbnail: thumbnail12
                })
                return await interaction.reply({ content: `> Done✅. Ticket Panel Description Title Was Now Set, Use "/ticket send panel" Command To Send Updated Embed.`, ephemeral: true })
            }
		}
//ticketend
		

//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////

		async function ticketOpen() {
			const role = ticketcheck.details.supportRole;
			const category1 = ticketcheck.details.category;
			const category = client.channels.cache.get(category1)
			const channelcheck = interaction.member.guild.channels.cache.find(channel => channel.name === `${interaction.user.username.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')}_${interaction.user.id}`);
			if(channelcheck){
				await interaction.followUp({ content: `> You Have Already An Open Ticket.` })
			} else {
				const channel1 = await interaction.guild.channels.create({
					name: `${interaction.user.username}_${interaction.user.id}`,
					type: Discord.ChannelType.GuildText,
					parent: category,
					topic: `${interaction.user.id}`,
					permissionOverwrites: [
						{
							id: interaction.guild.roles.everyone.id,
							deny: [Discord.PermissionsBitField.Flags.ViewChannel]
						},
						{
							id: interaction.user.id,
							allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages]
						},
						{
							id: role,
							allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages]
						}
					 ]
				}).then( async (channel) => {
					await interaction.followUp({ content: `Done✅. Check Out ${channel}.` })

					const buttonRow = new Discord.ActionRowBuilder()
						.addComponents(
							new Discord.ButtonBuilder()
								.setLabel('Close')
								.setCustomId('closeticket')
								.setStyle(Discord.ButtonStyle.Danger),
						)
					const embed = new Discord.EmbedBuilder()
						.setAuthor({
							name: `${interaction.user.tag}`,
							iconURL: `${interaction.user.displayAvatarURL({ extension: "png"})}`
						})
						.setTitle(`Ticket Opened`)
						.setDescription(`Please Wait Our Staff Will Arrive Soon To Help You.`)
						.setColor(`${process.env.ec}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`,
							iconURL: process.env.iconurl
						})
					channel.send({ content: `<@&${role}>, ${interaction.user} Created Ticket!`, embeds: [embed], components: [buttonRow] })
				})
			}
		}

//////////////////////////////////////////////////{Functions}//////////////////////////////////////////////////
	}
};