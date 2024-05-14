const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, PermissionsBitField, AttachmentBuilder, ModalBuilder, TextInputBuilder, StringSelectMenuBuilder } = require("discord.js");
const flip = require("flip-text");
const giphy = require("giphy-api")("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");
const akinator = require("../B_Modules/discord.js-akinator");
const fs = require('fs');
const https = require('https');
https.globalAgent.options.ca = fs.readFileSync('node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem');
const titlecase = require(`titlecase`);
const translate = require('@iamtraction/google-translate');
const ms = require(`ms`);
const roasts = require(`../A_Jsons/roast.json`);
const { TwoZeroFourEight, Flood, Hangman, RockPaperScissors, Slots, Snake, TicTacToe, Trivia, Wordle } = require('../B_Modules/discord-gamecord');
const canvacord = require("canvacord");
const version = require(`../package.json`).version;
const moment = require('moment');
const formattor = new Intl.ListFormat(`en-GB`, { style: `narrow`, type: `conjunction` })
const { joinVoiceChannel } = require('@discordjs/voice');
const { useTimeline, useQueue } = require("discord-player");
const { lyricsExtractor } = require('@discord-player/extractor');
const lyricsClient = lyricsExtractor('-V_Wjr6O6wJELT-3cdDiSOenILzYS4yHQD-CbcV3RNz_UFFhKZVy7WLYRljKcIHp');
const statuses = {
  "online" : "🟢",
  "idle" : "🌙",
  "dnd" : "🔴",
  "offline" : "⚫️",
};

module.exports = class Functions {
  constructor(client){
    this.client = client;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  collector(msg){
    const extension = this;
    function language(buttonRow, userId){
      const filter = i => i.customId;
		  const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
      collector.on('collect', async i => {
			  if(i.user.id != userId){
				  await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
        } else if(i.customId === "langcodes"){
				  i.reply({ content: ``, embeds: [await extension.akilangEmbed()], ephemeral: true })
        } else if(i.customId === "lcstop"){
				  buttonRow.components.map(component=> component.setDisabled(true));
				  await i.update({ components: [buttonRow] })
        }
      })
      collector.on('end', async (_, reason) => {
        if(reason === 'idle' || reason === 'user'){
				  buttonRow.components.map(component=> component.setDisabled(true));
				  return await msg.edit({ components: [buttonRow] });
        }
      });
    }
    function poll(choice1, choice2, embed, buttonRow){
      let Choice1Votes = 0;
		  let Choice2Votes = 0;
      let votedUsers = [];
      const filter = (i) => i.customId;
		  const collector = msg.createMessageComponentCollector({ filter, idle: 300000 });
      collector.on('collect', async (i) => {
				if(votedUsers.includes(i.user.id)){
					return await i.reply({ content: 'You Have Already Voted.', ephemeral: true });
				}
        if(i.customId === "pchoice1"){
          Choice1Votes++;
          votedUsers.push(`${i.user.id}`);
        } else if(i.customId === "pchoice2"){
          Choice2Votes++
          votedUsers.push(`${i.user.id}`);
        }
        const Total = Choice1Votes + Choice2Votes;
        const Percentage1 = (Choice1Votes / Total) * 100 || 0;
				const Percentage2 = (Choice2Votes / Total) * 100 || 0;
        embed.setFields(
          { name: `**OptionA: **`, value:`> ${Math.floor(Percentage1)}%`, inline: true },
          { name: `**OptionB: **`, value:`> ${Math.floor(Percentage2)}%`, inline: true },
          { name: `**TotalVotes: **`, value:`> ${Total}`, inline: true }
        )
        await i.update({ embeds: [embed] })  
      })
      collector.on('end', async (_, reason) => {
        if(reason === 'idle' || reason === 'user'){
          buttonRow.components.map(component=> component.setDisabled(true));
          if(Choice1Votes > Choice2Votes){
            embed.setDescription(`🅰: **${choice1} - {Majority}**\n\n🅱: **${choice2}**\n\n> **PollEnded: **<t:${Math.floor((Date.now())/1000)}:R>`)
            return await msg.edit({ embeds: [embed], components: [buttonRow] });  
          } else if(Choice2Votes > Choice1Votes){
            embed.setDescription(`🅰: **${choice1}**\n🅱: **${choice2} - {Majority}**\n\n> **PollEnded: **<t:${Math.floor((Date.now())/1000)}:R>`)
            return await msg.edit({ embeds: [embed], components: [buttonRow] });  
          } else {
            embed.setDescription(`🅰: **${choice1} - {Draw}**\n🅱: **${choice2} - {Draw}**\n\n> **PollEnded: **<t:${Math.floor((Date.now())/1000)}:R>`)
            return await msg.edit({ embeds: [embed], components: [buttonRow] });  
          }
        }
      });
    }
    function fact(userId, embed, buttonRow){
      const filter = i => i.customId;
		  const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
      collector.on('collect', async (i) => {
        if(i.user.id != userId){
          await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
        } else if(i.customId === "fact"){
          let embed1 = embed.setDescription(`${await extension.randomFact()}`);
          await i.update({ embeds: [embed1], components: [buttonRow] });
        } else if(i.customId === "stop"){
          buttonRow.components.map(component=> component.setDisabled(true));
          await i.update({ components: [buttonRow] });
        }
      })
      collector.on('end', async (_, reason) => {
        if(reason === 'idle' || reason === 'user'){
          buttonRow.components.map(component=> component.setDisabled(true));
          return await msg.edit({ components: [buttonRow] });
        }
      });
    }
    function dice(userId, embed, buttonRow){
      const filter = i => i.customId;
		  const collector = msg.createMessageComponentCollector({ filter, idle: 300000 });
      collector.on('collect', async (i) => {
			  if(i.user.id != userId){
				  return await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			  } else if(i.customId === `dice`){
				  i.update({ embeds: [embed.setDescription(`🎲 You Got \`${await Math.floor(Math.random() * 6) + 1}\``)], components: [buttonRow]})
			  } else if(i.customId === `distop`){
          buttonRow.components.map(component=> component.setDisabled(true));
				  await i.update({ components: [buttonRow] });
			  }
		  });
		  collector.on('end', async (_, reason) => {
			  if(reason === 'idle' || reason === 'user'){
				  buttonRow.components.map(component=> component.setDisabled(true));
				  await msg.edit({ components: [buttonRow] });
			  }
		  });
    }
    function meme(userId, embed, buttonRow){
      const filter = i => i.customId;
		  const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
      collector.on('collect', async i => {
			  if(i.user.id != userId){
				  return await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			  } 
			  if(i.customId === "meme"){
				  buttonRow.components.map(component=> component.setDisabled(true));
				  await i.update({ content: `Searching...`, components: [buttonRow] });
          let meme = await extension.genrateMeme();
				  if(meme){
					  await buttonRow.components.map(component=> component.setDisabled(false));
					  i.editReply({ content: ``, embeds: [embed.setTitle(`${titlecase(meme.title)}`).setURL(`${meme.url}`).setImage(meme.memeImage)], components: [buttonRow] });
        	}
			  }
			  if(i.customId === "mestop"){
				  buttonRow.components.map(component=> component.setDisabled(true));
				  await i.update({ components: [buttonRow] });
			  }
		  })

		  collector.on('end', async (_, reason) => {
			  if(reason === 'idle' || reason === 'user'){
				  buttonRow.components.map(component=> component.setDisabled(true));
				  await msg.edit({ components: [buttonRow] });
			  }
		  });
    }
    function help(int, embed, select, button){
      let type = "";

      const filter = i => i.customId;
		  const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
      collector.on('collect', async i => {
			  if(i.user.id != int.user.id){
				  return await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			  }
        if(i.customId === "msg"){
          type = "msg";
          await select.components.map(component => component.setDisabled(false));
          await button.components.map(component => component.setDisabled(true));
          await embed.setDescription(`Select One Of The Option Below.`);
          return await i.update({ embeds: [embed], components: [select, button] })
        }
        if(i.customId === "activities"){
          if(type === "msg"){

          } else {
            
          }
        }
      })
    }
    return { poll, fact, dice, meme, help, language };
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async translate(language, text){
    let ext = this;
    const languageNames = require(`../A_Jsons/languages.json`)
    const getLanguageName = (languageCode) => {
      return languageNames[languageCode] || "---";
    };  
    return translate(text, { to: language }).then(async(res) => {
      let embed = ext.embedBuild().title(`Translated To \`${await getLanguageName(language)}\``).description(`\`\`\`${res.text}\`\`\``).footer().build();
      return embed;
    })
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async report(int, bug, mt){
    let ext = this;
    let embed = this.embedBuild().title(`Bug Reported!`).description(`\`\`\`${bug}\`\`\``).ibvfields(`GuildName`, `${int.guild.name}`, `ReportedUser`, `${mt ? int.author.username : int.user.username}`).footer().build();

    return await this.client.channels.cache.get(`${process.env.reportlogschannel_id}`).send({ embeds: [embed] }).then(() => {
      let embed = ext.embedBuild().title(`Bug Reported! `).description(`> Our Team Will Contact You Soon, It Would Be Helpful If You Turn On Your Dm To Investigate The Issue.`).footer().build();
      return { embed };
    })
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async reminder(int, time, reason){
    let extthis = this;
    let description = null;
    if(!reason) description =  `**Reminder ${int.user}**`;
    if(reason) description =  `**Reminder ${int.user} : ${reason}**`;
    setTimeout(function(){
			const reminder = extthis.embedBuild().description(`${description}`).build()
			int.user.send({ content:`${int.user}`, embeds: [reminder]})
    }, ms(time));
    const embed = this.embedBuild().title(`Reminder Started!`).description(`**Ok I Will Remember You In \`${time}\`**\n> Please Make Sure Your Dm Is On.`).footer().build();
    return { embed }
  }  

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async randomFact(){
    let facts = require(`../A_Jsons/facts.json`);
    let fact = titlecase(facts[Math.floor(Math.random() * facts.length)]);
    return fact;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async covid(){
    return fetch(`https://disease.sh/v3/covid-19/all`)
    .then((res) => res.json())
    .then(async(data) => {
      const embedUpdate = await this.embedBuild().title(`Worldwide Covid-19 Stats`).ibvfields(`AllCases`, `${data.cases.toLocaleString()}`, `Deaths`, `${data.deaths.toLocaleString()}`, `Recovered`, `${data.recovered.toLocaleString()}`, `TodayCases`, `${data.todayCases.toLocaleString()}`, `TodayDeaths`, `${data.todayDeaths.toLocaleString()}`, `Active`, `${data.active.toLocaleString()}`, `Critical`, `${data.critical.toLocaleString()}`, `CasesPerMillion`, `${data.casesPerOneMillion.toLocaleString()}`).thumbnail(`${process.env.covid_thumbnail}`).footer().build();
      return { embedUpdate }
    }) 
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async wikipedia(query) {
    return await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
		.then(async(res) => res.json())
		.then(async (data) => {
			if(data.type === "disambiguation"){
        try{
          const embedUpdate = await this.embedBuild().title(`${data.title}`).url(`${data.content_urls.desktop.page}`).description(`${data.extract}\n\n> Link For This Topic : [Click Me!](${data.content_urls.desktop.page})`).thumbnail(`${data.thumbnail.source}`).footer().build();
          return await { embedUpdate }
        } catch(e){
          const embedUpdate = await this.embedBuild().description(`> No Results Found For \`${query}\``).build();
          return { embedUpdate }
        }
      } else {
        try{
          const embedUpdate = await this.embedBuild().title(`${data.title}`).url(`${data.content_urls.desktop.page}`).description(`${data.extract}`).thumbnail(`${data.thumbnail.source}`).footer().build();
          return await { embedUpdate }
        } catch(e){
          const embedUpdate = await this.embedBuild().description(`> No Results Found For \`${query}\``).build();
          return { embedUpdate }
        }
      }
    })
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async lyrics(int){
    let client = this;
    const { track } = useTimeline(int.guild.id);
    return await lyricsClient.search(`${track.title}`).then(async(finder) => { return await client.embedBuild().title(`Lyrics For ${track.title}`).description(`${finder.lyrics}`).footer().build() })
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async play(vc, query, interact, statement){
    let this1 = this;
    return await this.client.player.play(vc, query, {
      nodeOptions: {
        metadata: {
          channel: interact.channel,
          client: interact.guild.members.me,
          requestedBy: statement ? interact.user : interact.author,
        },
        selfDeaf: true,
        volume: 100,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 60000,
        leaveOnEnd: true,
      },  
    }).catch(() => {
      const embed = this1.embedBuild().title(`Error Encountered`).description(`**Reasons May Be: **\n> Only Spotify, Souncloud, AppleMusic Allowed.\n> Internal Error.\n\n**Note: ** If You Think This Is A Bug Please Report By Using "/report" Command.`).footer().build();
      interact.channel.send({ embeds: [embed] })
    })
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async nowPlaying(int){
    const queue = useQueue(int.guild.id);
    const { timestamp, track } = useTimeline(int.guild.id);
    const part = Math.floor((timestamp.current.value / timestamp.total.value) * 30);
		const embed = await this.embedBuild().author(track.playing ? 'Song Pause...' : 'Now Playing...', `${process.env.music_iconurl}`).description(`[${track.title}](${track.url})`).thumbnail(`${track.thumbnail}`).bfields(`Author`, `> ${track.author}`, true, `Volume`, `> ${queue.node.volume}%`, true, `Live`, `> ${track.is_live ? "\`✔️\`" : "\`❌\`"}`, true,  `CurrentDuration`, `> \`[${timestamp.current.label} / ${timestamp.total.label}]\``, true,  `Filters`, `> ${queue.filter || 'None'}`, true,  `ProgressBar`, `\`\`\`♪ ${'━'.repeat(part) + '🔵' + '━'.repeat(30 - part)}(${timestamp.progress}%)\`\`\``, false).footer().build();
    return embed;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async joinVc(channel){
    return await joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async userInfo(interact, option, msg){
    let client = this;
    const flag = { 
      TEAM_PSEUDO_USER: 'Team User', 
      BugHunterLevel1: 'Bug Hunter',
      BugHunterLevel2: 'Bug Buster',
      CertifiedModerator: 'Discord Certified Moderator',
      HypeSquadOnlineHouse1: 'House of Bravery',
      HypeSquadOnlineHouse2: 'House of Brilliance',
      HypeSquadOnlineHouse3: 'House of Balance',
      Hypesquad: 'HypeSquad Event Attendee',
      Partner: 'Discord Partner',
      PremiumEarlySupporter: 'Early Nitro Supporter',
      STAFF: 'Discord Staff',
      VerifiedBot: 'Verified Bot',
      VerifiedDeveloper: 'Verified Developer',
      ActiveDeveloper: 'Active Developer'
    };

    if(option === true){
      let UserOption = client.getOptions(interact).user('user') || interact.user;
      let UserOption1 = client.getOptions(interact).member('user') || interact.member;
      let target = await interact.guild.members.fetch(UserOption.id)
      let userFlags = UserOption.flags.toArray();
      let filteredFlags = userFlags.filter(f => f in flag);
      let flog = await filteredFlags.length ? formattor.format(filteredFlags.map(flags => flag[flags])) : "None" ;
      let discriminator = UserOption.discriminator === "0" ? "`DNU`" : `#${UserOption.discriminator}`;
      let content = `**DiscordUserSince: **<t:${Math.floor((UserOption.createdAt)/1000)}:R>\n**ServerJoined: ** <t:${Math.floor((UserOption1.joinedAt)/1000)}:R>`;
      let embed = await client.embedBuild().title(`Userinfo of \`${UserOption.username}\``).thumbnail(UserOption.displayAvatarURL({dynamic: true})).author(`${UserOption.username}`, UserOption.displayAvatarURL({dynamic: true, size: 2048})).fields(`Username`, `> ${UserOption.username}`, true, `Tag`, `> ${discriminator}`, true, `Id`, `> ${UserOption.id}`, true, `Avatar`, `> [ClickHere](${UserOption.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })})`, true, `Bot`, `> ${UserOption.bot ? "\`✅\`" : "\`❌\`"}`, true, `Status`, `> \`${statuses[UserOption1.presence ? UserOption1.presence.status : "offline"]}\``, true, `Roles`, `> ${target.roles.cache.map(r => r).join(' ').replace("@everyone", "") || "NONE"}`, false, `DiscordUserSince`, `\`\`\`> ${moment(UserOption.createdAt).format(`DD-MM-YYYY`)}\`\`\``, true, `ServerJoined`, `\`\`\`> ${moment(UserOption1.joinedAt).format(`DD-MM-YYYY`)}\`\`\``, true, `Flages`, `\`\`\`> ${flog.replace(`, `, `\n> `)}\`\`\``, false).footer().build();
      return await { embed, content }
    } else {
      let UserOption = msg;
      let target = await interact.guild.members.fetch(UserOption.id)
      let userFlags = UserOption.user.flags.toArray();
      let filteredFlags = userFlags.filter(f => f in flag);
      let flog = await filteredFlags.length ? formattor.format(filteredFlags.map(flags => flag[flags])) : "None" ;
      let discriminator = UserOption.user.discriminator === "0" ? "`DNU`" : `#${UserOption.user.discriminator}`;
      let content = `**DiscordUserSince: **<t:${Math.floor((UserOption.user.createdAt)/1000)}:R>\n**ServerJoined: ** <t:${Math.floor((UserOption.joinedAt)/1000)}:R>`;
      let embed = await client.embedBuild().title(`Userinfo of \`${UserOption.user.username}\``).thumbnail(UserOption.displayAvatarURL({dynamic: true})).author(`${UserOption.username}`, UserOption.displayAvatarURL({dynamic: true, size: 2048})).fields(`Username`, `> ${UserOption.username}`, true, `Tag`, `> ${discriminator}`, true, `Id`, `> ${UserOption.id}`, true, `Avatar`, `> [ClickHere](${UserOption.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })})`, true, `Bot`, `> ${UserOption.bot ? "\`✅\`" : "\`❌\`"}`, true, `Status`, `> \`${statuses[UserOption.presence ? UserOption.presence.status : "offline"]}\``, true, `Roles`, `> ${target.roles.cache.map(r => r).join(' ').replace("@everyone", "") || "NONE"}`, false, `DiscordUserSince`, `\`\`\`> ${moment(UserOption.user.createdAt).format(`DD-MM-YYYY`)}\`\`\``, true, `ServerJoined`, `\`\`\`> ${moment(UserOption.joinedAt).format(`DD-MM-YYYY`)}\`\`\``, true, `Flages`, `\`\`\`> ${flog.replace(`, `, `\n> `)}\`\`\``, false).footer().build();
      return await { embed, content }
    }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async updates(){
    const updateget = await this.client.db.get(`update`);
		let updatetext = null;
		let id = null;
		if(!updateget) updatetext = "None"
		if(updateget) [updatetext, id] = updateget.textandid.split(',')
    return await this.embedBuild().title(`Updates`).description(`\`\`\`${await updatetext}\`\`\``).footer().build();
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async memberCount(interact){
		const members = await interact.guild.members.fetch();
		const botMembers = members.filter(member => member.user.bot);
		const realMembers = members.filter(member => !member.user.bot);
    return this.embedBuild().title(`Member Count - \`${interact.guild.name}\``).ibvfields(`Members`, `\`${realMembers.size.toLocaleString()}\``, `Bots`, `\`${botMembers.size.toLocaleString()}\``, `Total`, `\`${members.size.toLocaleString()}\``).footer().build();
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  invite(){
    return this.embedBuild().title(`Invite Me`).description(`Invite \`${this.client.user.username}\` Bot Now - [InviteMe](https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot%20applications.commands)`).thumbnail(`${process.env.iconurl}`).footer().build();
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async help(){
    const selectMenuRow = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setPlaceholder('Select An Option')
					.setCustomId('hlpcmd')
					.setDisabled(true)
					.setMaxValues(1)
					.setOptions([
            { label: 'Activities', value: 'activities', emoji: '🚀' },
						{ label: 'Akinator', value: 'akinator', emoji: '🧞' },
						{ label: 'Chatbot', value: 'chatbot', emoji: '🤖' },
            { label: 'Economy', value: 'economy', emoji: '🏛️' },
						{ label: 'Fun', value: 'fun', emoji: '🎯' },
						{ label: 'Mini Player Games', value: 'games', emoji: '🎮' },
						{ label: 'Giveaway', value: 'giveaway', emoji: '🎉' },
						{ label: 'Image', value: 'image', emoji: '🖼️' },
						{ label: 'Info', value: 'info', emoji: '🌐' },
            { label: 'Moderation', value: 'moderation', emoji: '🛡️' },
            { label: 'Music', value: 'music', emoji: '🎶' },
						{ label: 'Ticket', value: 'ticket',	emoji: '🎫' },
						{ label: 'Truth Or Dare', value: 'tod', emoji: '🎭' },
						{ label: 'Utility', value: 'utility', emoji: '🔨' },
						{ label: 'Welcome', value: 'welcome', emoji: '👋' },
						{ label: '\u200b', value: '\u200b' },
						{ label: 'Stop', value: 'stp', emoji: '🛑' },
					]),
			);
    const buttonRow = await this.buttons(`Message`, `msg`, ButtonStyle.Secondary, `Slash`, `slsh`, ButtonStyle.Secondary, `Stop`, `stp`, ButtonStyle.Danger);
    const embed = await this.embedBuild().title(`Help`).description(`Select One Of The Button Below.`).thumbnail(`${process.env.iconurl}`).footer().build();
    return { embed, buttonRow, selectMenuRow };
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async botInfo(api, latency){
    const client = this.client;
    const thisT = this;
    const buttonRow = this.buttons('Website', `${process.env.website}(url)`, ButtonStyle.Link, 'Invite', `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands(url)`, ButtonStyle.Link,'Top.gg', `https://top.gg/bot/${client.user.id}(url)`, ButtonStyle.Link);
    const results = await Promise.all([ client.shard.fetchClientValues('guilds.cache.size'), client.shard.broadcastEval((c) => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))]);
    let embed = await thisT.embedBuild().title(`🤖 Bot Info - \`${client.user.username}\``).description(`**Please Support Us By Voting On Top.gg**`).thumbnail(`${process.env.iconurl}`).ibfields(`✉️ InviteMe`, `> [InviteMe](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`, `🟢 Api`, `> \`${api} ms\``, `🏓 Latency`, `> \`${latency} ms\``, `🏠 Guilds`, `> ${await results[0].reduce((acc, guildCount) => acc + guildCount, 0)}`, `👥 Users`, `> ${await results[1].reduce((acc, memberCount) => acc + memberCount, 0)}`, `🤖 TotalCommands`, `> ${process.env.commands_count} Cmds`, `🤖 Version`, `\`\`\`> v${version}\`\`\``).footer().build();
    return await { buttonRow, embed };
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async avatar(usr, size, torf){
    let buttonRow = await this.buttons(`Png`, `${await image(`png`)}(url)`, ButtonStyle.Link, `Jpg`, `${await image(`jpg`)}(url)`, ButtonStyle.Link, `Webp`, `${await image(`webp`)}(url)`, ButtonStyle.Link);
    let embed = await this.embedBuild().title(`${torf ? usr.user.username : usr.username}'s Avatar`).description(`> Click One Of The Formats You Like.\n> PNG(Recommended)`).image(await image(`png`)).footer().build();
    async function image(extension){
      return usr.displayAvatarURL({ size: await size, dynamic: true, extension: extension })
    }
    return { embed, buttonRow }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  image(usr){
    async function blur(){
      let image = await canvacord.Canvas.blur(usr.displayAvatarURL({ extension: 'png' }));
      return await new AttachmentBuilder(image, { name: "blur.png"});
    }
    async function gay(){
      return await new AttachmentBuilder(`${process.env.srapi}/canvas/Gay?avatar=${usr.displayAvatarURL({ extension: 'png' })}`, { name: "gay.png" })
    }
    async function greyScale(){
      let image = await canvacord.Canvas.greyscale(usr.displayAvatarURL({ extension: 'png' }));
      return await new AttachmentBuilder(image, { name: "greyscale.png"});
    }
    async function invert(){
      let image = await canvacord.Canvas.invert(usr.displayAvatarURL({ extension: 'png' }));
      return await new AttachmentBuilder(image, { name: "greyscale.png"});
    }
    async function jail(){
      let image = await canvacord.Canvas.jail(usr.displayAvatarURL({ extension: 'png' }));
      return await new AttachmentBuilder(image, { name: "greyscale.png"});
    }
    async function sepia(){
      let image = await canvacord.Canvas.sepia(usr.displayAvatarURL({ extension: 'png' }));
      return await new AttachmentBuilder(image, { name: "greyscale.png"});
    }
    async function trigger(){
      let image = await canvacord.Canvas.trigger(usr.displayAvatarURL({ extension: 'png' }));
      return await new AttachmentBuilder(image, { name: "greyscale.png"});
    }
    async function wasted(){
      let image = await canvacord.Canvas.wasted(usr.displayAvatarURL({ extension: 'png' }));
      return await new AttachmentBuilder(image, { name: "greyscale.png"});
    }
    async function youTube(avatar, userName, comment){
      return await new AttachmentBuilder(`${process.env.srapi}/canvas/youtube-comment?avatar=${avatar}&username=${userName}&comment=${comment}`, { name: "youtube.png" })
    }
    return { blur, gay, greyScale, invert, jail, sepia, trigger, wasted, youTube };
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  giveaway(){
    let client = this.client;
    function start(channel, prize, duration, winnerCount, user){
      return client.giveawaysManager.start(channel, {
        prize,
        duration,
        winnerCount,
        messages,
        hostedBy: user,
      });
    }
    function delet(id){
      return client.giveawaysManager.delete(id);
    }
    function end(id){
      return client.giveawaysManager.end(id);
    }
    function pause(id){
      return client.giveawaysManager.pause(id);
    }
    function resume(id){
      return client.giveawaysManager.unpause(id);
    }
    async function edit(id, string){
      if(string.includes(`win`)){
        let winnerCount = await string.replace(/\(win\)/g, '');
        await client.giveawaysManager.edit(id, {
          addTime: 5000,
          newWinnerCount: winnerCount
        })
      } else if(string.includes(`pri`)){
        await client.giveawaysManager.edit(id, {
          addTime: 5000,
          newPrize: string.replace(/\(pri\)/g, '')
        })
      } else if(string.includes(`wp`)){
        let text = string.replace(/\(wp\)/g, '')
        let part = text.split(',');
        await client.giveawaysManager.edit(id, {
          addTime: 5000,
          newWinnerCount: part[0],
          newPrize: part[1]
        })
      }
    }
    function reRoll(id){
      return client.giveawaysManager.reroll(id);
    }
    return { start, delet, end, pause, resume, edit, reRoll };
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  eightBall(){
    const array = [
      "Yes",
      "Yes Maybe!",
      "Absolute",
      "Hmmm...",
      "Sussy Baka",
      "Idk",
      "No",
      "Huh!",
      "I Mean... Yes",
      "I Mean No",
      "I Mean So",
      "Small Change",
      "Big chance",
      "Never!",
      "Bruh",
      "Yoo Whatt???",
    ];
    return `${array[Math.floor(Math.random() * array.length)]}`;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async vaporText(args){
    let msg = "";
    for(let i = 0; i < args.length; i++){
        msg += args[i].toUpperCase().split("").join(" ") + " ";
    }
    return await msg;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  roast(){
    return `${titlecase(roasts[Math.floor(Math.random() * roasts.length)])}`;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  nitro(msg){
    let extension = this;
    let time = "3s";
    setTimeout(function (){
      msg.edit({content: " ", embeds: [extension.embedBuild().description(`Getting Things Ready For Nitro Payment!`).build()]});
    }, ms(time));
    let time14 = "5s";
    setTimeout(function (){
      msg.edit({embeds: [extension.embedBuild().description(`Getting Things Ready For Nitro Payment!`).build()]});
    }, ms(time14));
    let time2 = "7s";
    setTimeout(function (){
      msg.edit({embeds: [extension.embedBuild().description(`Choosen 99.99$ Plan!`).build()]});
    }, ms(time2));
    let time3 = "10s";
    setTimeout(function (){
      msg.edit({embeds: [extension.embedBuild().description(`Payment Requested In Paypal!`).image(`https://cdn.discordapp.com/attachments/1097119486986960968/1097822394351104101/animated-paypal-loading.gif`).footer().build()]});
    }, ms(time3));
    let time5 = "18s";
    setTimeout(function (){
      msg.edit({embeds: [extension.embedBuild().title(`Here Is Your Nitro Link!`).description(`[Click Here](https://bit.ly/3HydaR9) To Claim Your Nitro!`).image(`https://i.imgur.com/ZEopR3f.png`).build()]});
    }, ms(time5));
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async genrateMeme(){
		try{
			let sub = [ 'meme', 'me_irl', 'memes', 'dankmeme', 'dankmemes', 'ComedyCemetery', 'terriblefacebookmemes', 'funny']
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
				return { url, memeImage, title };
			}
		} catch(e){
			let url = process.env.website;
			let memeImage = "https://i.imgur.com/lCGlrZq.png";
			let title = "Error Occured"
			console.log(e)
			return { url, memeImage, title };
		}
	}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  async hug(){
    let response = await fetch(`${process.env.srapi}/animu/hug`);
    let data = await response.json();
    return await new AttachmentBuilder(data.link, { name: 'hug.gif' });
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async akinator(msg, lang){
    return await akinator(msg, {
      language: lang,
      childMode: false,
      gameType: "character",
      useButtons: true,
      embedColor: process.env.ec
    })
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async gif(string){
    return giphy.search(string).then(async function(res){
      let id = res.data[0].id;
      let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`;
      return msgurl;
    })
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  catSay(string){
    let img = `https://cataas.com/cat/cute/says/${string}`
    return img;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  filpText(string){
    const flipped = flip(string);
		const fliptext = flipped.split("").reverse().join("");
    return fliptext;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  embedBuild(){
    const client = this.client;
    const embed = new EmbedBuilder().setColor(`${process.env.ec}`);
    function title(title){
      embed.setTitle(title);
      return this;
    }
    function description(description){
      embed.setDescription(description);
      return this;
    }
    function color(clr){
      embed.setColor(clr);
      return this;
    }
    function author(text, iconurl){
      embed.setAuthor({ name: text, iconURL: iconurl });
      return this;
    }
    function thumbnail(url){
      embed.setThumbnail(url);
      return this;
    }
    function image(url){
      embed.setImage(url);
      return this;
    }
    function url(url){
      embed.setURL(url);
      return this;
    }
    function footer(text, iconurl){
      embed.setFooter({ text: text ? text : `${client.user.username} - ${process.env.year} ©` , iconURL: iconurl ? iconurl : process.env.iconurl });
      return this;
    }
    function fields(...fieldSets){
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 3){
        const [name, value, inline] = fieldSets.slice(i, i + 3);
        realFields.push({ name, value, inline });
      }
      embed.addFields(...realFields);
      return this;
    }
    function ifields(...fieldSets){
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 2){
        const [name, value] = fieldSets.slice(i, i + 2);
        realFields.push({ name, value, inline: true });
      }
      embed.addFields(...realFields);
      return this;
    }
    function bfields(...fieldSets){
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 3){
        const [name, value, inline] = fieldSets.slice(i, i + 3);
        realFields.push({ name: `**${name}: **`, value, inline });
      }
      embed.addFields(...realFields);
      return this;
    }
    function vfields(...fieldSets){
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 3){
        const [name, value, inline] = fieldSets.slice(i, i + 3);
        realFields.push({ name , value: `> ${value}`, inline });
      }
      embed.addFields(...realFields);
      return this;
    }
    function ibfields(...fieldSets){
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 2){
        const [name, value] = fieldSets.slice(i, i + 2);
        realFields.push({ name: `**${name}: **`, value, inline: true });
      }
      embed.addFields(...realFields);
      return this;
    }
    function bvfields(...fieldSets){
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 2){
        const [name, value] = fieldSets.slice(i, i + 2);
        realFields.push({ name: `**${name}: **`, value: `> ${value}`, inline });
      }
      embed.addFields(...realFields);
      return this;
    }
    function ivfields(...fieldSets){
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 2){
        const [name, value] = fieldSets.slice(i, i + 2);
        realFields.push({ name , value: `> ${value}`, inline: true });
      }
      embed.addFields(...realFields);
      return this;
    }
    function ibvfields(...fieldSets){
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 2){
        const [name, value] = fieldSets.slice(i, i + 2);
        realFields.push({ name: `**${name}: **`, value: `> ${value}`, inline: true });
      }
      embed.addFields(...realFields);
      return this;
    }
    function build(){
      return embed;
    }
    return { author, title, description, thumbnail, image, url, fields, ifields, bfields, ibfields, vfields, bvfields, ivfields, ibvfields, color, footer, build };
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  randomNum(num){
    function whole(){
      const random = Math.floor(Math.random() * num + 1);
      return random;
    }
    async function natural(){
      const random = Math.floor(Math.random() * num) + 1;
      return random;
    }
    return { whole, natural }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  modal(){
    function builder(label, id){
      const modalBuild = new ModalBuilder()
			  .setCustomId(id)
			  .setTitle(label);
      return modalBuild;
    }
    function text(label, id, style){
      const textBuild = new TextInputBuilder()
			  .setCustomId(id)
			  .setLabel(label)
			  .setStyle(style);
      return textBuild;
    }
    function action(comp){
      const actionBuild = new ActionRowBuilder().addComponents(comp);
      return actionBuild;
    }
    return { builder, text, action }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  buttons(...values){
    const buttonRow = new ActionRowBuilder();
    for (let i = 0; i < values.length; i += 3){
      const [label, customId, style] = values.slice(i, i + 3);
      if(customId.includes(`url`)){
        const button = new ButtonBuilder()
          .setLabel(`${label.replace(/\(disabled\)/g, '')}`)
          .setURL(`${customId.replace(/\(url\)/g, '')}`)
          .setDisabled(label.includes(`disabled`) ? true : false)
          .setStyle(style);
        buttonRow.addComponents(button);
      } else {
        const button = new ButtonBuilder()
          .setLabel(`${label.replace(/\(disabled\)/g, '')}`)
          .setCustomId(`${customId}`)
          .setDisabled(label.includes(`disabled`) ? true : false)
          .setStyle(style);
        buttonRow.addComponents(button);
      }
    }
    return buttonRow;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  voiceChannel(){
    function message(msg){
      let channel = msg.member.voice.channel;
      return channel;
    }
    function interaction(int){
      let channel = int.member.voice.channel;
      return channel;
    }
    return { message, interaction }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  deferReply(){
    const client = this.client;
    function message(msg){
      return msg.reply({ content: `> ${client.user.username} Is Thinking...` })
    }
    return { message }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  permsCheck(perm){
    let Permissions = PermissionsBitField.Flags;
    perm = perm.replace(`manageGuild`, Permissions.ManageGuild)
              .replace(`kick`, Permissions.KickMembers)
              .replace(`ban`, Permissions.BanMembers)
              .replace(`sendMessages`, Permissions.SendMessages)
              .replace(`viewChannel`, Permissions.ViewChannel);
    function message(msg){
      return msg.member.permissions.has(perm);
    }
    function interaction(int){
      return int.memberPermissions.has(perm);
    }
    return { message, interaction }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  akilangEmbed(){
    return this.embedBuild().title(`All Language Codes`).description(`**Usage: **\`${process.env.prefix}setakilang <langCode>\`\n\n<langcode> - <language>\n**en - English(Recommended)**\naf - Afghanistan\nam - Armenia\nar - Argentina\naz - Azerbaijan\nbe - Belarus\nbg - Bulgaria\nbn - Bangladesh\nbs - Bosnia and Herzegovina\nca - Canada\nceb - Cebuano\nco - Corsica\ncs - Czech\ncy - Welsh\nda - Danish\nde - German\nel - Greek\neo - Esperanto\nes - Spanish\net - Estonian\neu - Basque\nfa - Persian\nfi - Finnish\nfr - French\nfy - West Frisian\nga - Irish\ngd - Scottish Gaelic\ngl - Galician\ngu - Gujarati\nha - Hausa\nhaw - Hawaiian\nhe - Hebrew\nhi - Hindi\nhmm - Hmong\nhr - Croatian\nht - Haitian Creole\nhu - Hungarian\nhy - Armenian\nid - Indonesian\nig - Igbo\nis - Icelandic\nit - Italian\niw - Hebrew (deprecated)\nka - Georgian\nkk - Kazakh\nkm - Khmer\nkn - Kannada\nko - Korean\nku - Kurdish\nky - Kyrgyz\nla - Latin\nlb - Luxembourgish\nlo - Lao\nlt - Lithuanian\nlv - Latvian\nmg - Malagasy\nmi - Maori\nmk - Macedonian\nml - Malayalam\nmn - Mongolian\nmr - Marathi\nms - Malay\nmt - Maltese\nmy - Burmese\nne - Nepali\nnl - Dutch\nno - Norwegian\nny - Chichewa\npa - Punjabi\npl - Polish\nps - Pashto\npt - Portuguese\nro - Romanian\nru - Russian\nsd - Sindhi\nsi - Sinhala\nsk - Slovak\nsl - Slovenian\nsm - Samoan\nsn - Shona\nso - Somali\nsq - Albanian\nsr - Serbian\nst - Southern Sotho\nsu - Sundanese\nsv - Swedish\nsw - Swahili\nta - Tamil\nte - Telugu\ntg - Tajik\nth - Thai\ntl - Filipino\ntr - Turkish\nuk - Ukrainian\nur - Urdu\nuz - Uzbek\nvi - Vietnamese\nxh - Xhosa\nyi - Yiddish\nyo - Yoruba\nzh-cn - Chinese (Simplified)\nzh-tw - Chinese (Traditional)\nzh - Chinese\nzu - Zulu `).footer().build();
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  pingEmbed(api, latency){
    return this.embedBuild().ibfields(`🟢 Api`, `> \`${api} ms\``, `🏓 Latency`, `> \`${latency} ms\``).build();
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  errorMsg(){
    function bug(){
      return `> Error Occured Please Try Later Or Use "/report" To Report The Bug.`
    }
    function vc(){
      return `> Please Make Sure You Are In A Voice Channel.`
    }
    function user(){
      return `> Mention A User To Use This Command.`
    }
    function text(){
      return `> Enter Some Text Use This Command.`
    }
    return { bug, vc, user, text }
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  getOptions(interaction){
    function string(text){
      let stringInput = interaction.options.getString(text);
      return stringInput;
    }
    function user(usr){
      let usrInput = interaction.options.getUser(usr);
      return usrInput;
    }
    function member(mbr){
      let usrInput = interaction.options.getMember(mbr);
      return usrInput;
    }
    function channel(chl){
      let chlInput = interaction.options.getChannel(chl);
      return chlInput;
    }
    function integer(int){
      let intInput = interaction.options.getInteger(int);
      return intInput;
    }
    function number(num){
      let numInput = interaction.options.getNumber(num);
      return numInput;
    }
    function role(rle){
      let rleInput = interaction.options.getRole(rle);
      return rleInput;
    }
    function subcommand(){
      let suCommandInput = interaction.options.getSubcommand();
      return suCommandInput;
    }
    return { string, user, member, channel, integer, number, role, subcommand }
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  isValidURL(url){
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    return pattern.test(url);
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  cmdCoolDown(message, command){
    let client = message.client;
    if(!message || !client) return;
    if(!command || !command.name) return;
    if(!client.cooldowns.has(command.name)){
      client.cooldowns.set(command.name, new Collection());
    }
    const time = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown) * 1000;
    if(time.has(`${message.member.id}`)){
      const expirationTime = time.get(message.member.id) + cooldownAmount;
      if(Date.now() < expirationTime){
        const timeLeft = (expirationTime - Date.now()) / 1000;
        return timeLeft
      } else {
        time.set(message.member.id, Date.now()); 
        setTimeout(() => time.delete(message.member.id), cooldownAmount); 
        return false;
      }
    }else {
      time.set(message.member.id, Date.now()); 
      setTimeout(() => time.delete(message.member.id), cooldownAmount); 
      return false;
    }
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  escapeRegex(str){
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  async discordActivity(vcId, appId){
    const codes = {
      youtube: '880218394199220334',
      poker: '755827207812677713',
      jamspace: '1070087967294631976',
      puttparty: '763133495793942528',
      garticphone: '1007373802981822582',
      kwim: '1078728822972764312',
      chess: '832012774040141894',
      bobble: '947957217959759964',
      landio: '903769130790969345',
      sketchheads: '902271654783242291',
      blazing8: '832025144389533716',
      spellcast: '852509694341283871',
      checkers: '832013003968348200',
      lettertile: '879863686565621790',
    };
    let response = await fetch(`https://discord.com/api/v10/channels/${vcId}/invites`, {
      method: 'POST',
      body: JSON.stringify({
      max_age: 86400,
      max_uses: 0,
      target_application_id: codes[appId],
      target_type: 2,
      temporary: false,
      validate: null,
    }),
    headers: { Authorization: `Bot ${process.env.token}`, 'Content-Type': 'application/json', },
    });
    const invite = await response.json();
    if(invite.error || !invite.code) return console.log('An Error Occured While Genrating Link.');
    return `https://discord.com/invite/${invite.code}`;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  games(interact, torf){
    let extension = this;
    function ctfRandom(){
      const positions = {      
        safe  :   '_ _                          :fish:\n            _ _              :hand_splayed:\n            _ _              :cat:',
        danger: '_ _                          💣\n            _ _              :hand_splayed:\n            _ _              :cat:',
        win   :    '_ _           :crown:**You Won.**:crown:\n_ _                      :hand_splayed:\n_ _                      :cat:',
        lose  :   '_ _           :skull:**You Lost.**:skull:             \n_ _                      :hand_splayed:\n_ _                      :cat:',
        left  :   '_ _                 **You Left.**\n_ _                      :hand_splayed:\n_ _                      :cat:'
      };
      let randomized = Math.floor(Math.random() * 2);
      let randomPos = `${positions[Object.keys(positions)[randomized]]}`
      return { positions, randomPos }
    }
    function footBallRandom(){
      const positions = {
        left    : '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',
        middle  : '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',
        right   : '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',
      };
      let randomized = Math.floor(Math.random() * Object.keys(positions).length);
      let randomPos = positions[Object.keys(positions)[randomized]];
      return { positions, randomPos, randomized }
    }
    function twozerofoureight(){
      return new TwoZeroFourEight({
        message : interact,
        isSlashGame: torf,
        embed: {
          title: '2048',
          color: `${process.env.ec}`,
        },
      }).startGame();
    }
    function catchTheFish(msg, count, componentsArray, userId){
      let randomized = Math.floor(Math.random() * 2);
      let gameEnded = false;
      let positions = ctfRandom().positions;
      let randomPos = ctfRandom().randomPos;
      let data = 0;
      const filter = i => i.customId;
      const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
      function update(button){
        randomized = Math.floor(Math.random() * 2);
        randomPos = positions[Object.keys(positions)[randomized]];
        if(data === count){
          gameEnded = true;
          collector.stop();
          componentsArray.components.map(component=> component.setDisabled(true));
          msg.edit({ content: positions.win, components: [componentsArray] });
          button.deferUpdate();
        } else {
          if(data <= -count * 3){
            gameEnded = true;
            collector.stop();
            componentsArray.components.map(component=> component.setDisabled(true));
            msg.edit({ content: positions.lose, components: [componentsArray] });
            button.deferUpdate();
          } else {
            if(button){
              return button.deferUpdate();
            } else {
              msg.edit({ content: randomPos + `           **${data}**`, components: [componentsArray] });
            }
          } 
        }
      }
      setInterval(() => {
        if(gameEnded === false){
          return update();
        } 
      }, 1000);
      collector.on('collect', async (button) => {
        if(button.user.id != userId){
          await button.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
        }
        if(button.customId === "e"){
          gameEnded = true;
          componentsArray.components.map(component=> component.setDisabled(true));
          await msg.edit({ components: [componentsArray] });
        }
        if(button.customId === "ee"){
          gameEnded = true;
          componentsArray.components.map(component=> component.setDisabled(true));
          await msg.edit({ components: [componentsArray] });
        }
        if(randomized !== 0){
          data -= count;
          update(button);
        } else {
          data++;
          update(button);
        }
      });
      collector.on('end', async (_, reason) => {
        if(reason === 'idle' || reason === 'user'){
          gameEnded = true;
          componentsArray.components.map(component=> component.setDisabled(true));
          await msg.edit({ components: [componentsArray] });
        }
      });
    }
    function footBall(msg, componentsArray, userId){
      let positions = footBallRandom().positions;
      let randomPos = footBallRandom().randomPos;
      let randomized = footBallRandom().randomized;
      let gameEnded = false;
      function update(){
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
        if(button.user.id != userId){
          await button.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
        }
        if(button.customId !== Object.keys(positions)[randomized]){
          gameEnded = true;
          componentsArray.components.map(component=> component.setDisabled(true));
          await msg.edit({ components: [componentsArray, extension.buttons(`YouWon(disabled)`, `yw`, ButtonStyle.Secondary)] });
          return button.deferUpdate();
        } else {
          gameEnded = true;
          componentsArray.components.map(component=> component.setDisabled(true));
          await msg.edit({ components: [componentsArray, extension.buttons(`YouLose(disabled)`, `yl`, ButtonStyle.Secondary)] });
          return button.deferUpdate();
        }
      });
      collector.on('end', async (_, reason) => {
        if(reason === 'idle' || reason === 'user'){
          gameEnded = true;
          componentsArray.components.map(component=> component.setDisabled(true));
          await msg.edit({ components: [componentsArray] });
        }
      });
    }
    function flood(difficult){
      new Flood({
        message : interact,
        isSlashGame: torf,
        embed: {
          title: 'Flood',
          difficulty: difficult ? difficult : `13`,
          color: `${process.env.ec}`,
        },
      }).startGame();
    }
    function hangMan(){
      new Hangman({
        message : interact,
        isSlashGame: torf,
        embed: {
          title: 'Hangman',
          color: `${process.env.ec}`,
        },
      }).startGame();
    }
    function rockPaperScissors(opponent){
      new RockPaperScissors({
        message : interact,
        isSlashGame: torf,
        opponent: opponent,
        embed: {
          title: 'Rock Paper Sissors',
          color: `${process.env.ec}`,
        },
      }).startGame();
    }
    function slots(){
      new Slots({
        message : interact,
        isSlashGame: torf,
        embed: {
          title: 'Slots',
          color: `${process.env.ec}`,
        },
      }).startGame();
    }
    function snake(){
      new Snake({
        message: interact,
        isSlashGame: torf,
        embed: {
          title: 'Snake',
          color: `${process.env.ec}`,
          OverTitle: 'Game Over',
        },
        snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
        emojis: {
          board: '⬛', 
          food: '🍎',
          up: '⬆️', 
          right: '➡️',
          down: '⬇️',
          left: '⬅️',
        },
        foods: ['🍎', '🍇', '🍊', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍏'],
        stopButton: 'Stop',
        othersMessage: 'You are not allowed to use buttons for this message!',
      }).startGame();
    }
    function tictactoe(opponent){
      new TicTacToe({
        message : interact,
        isSlashGame: torf,
        opponent: opponent,
        embed: {
          title: 'Tic Tac Toe',
          color: `${process.env.ec}`,
        },
      }).startGame();
    }
    function trivia(){
      new Trivia({
        message: interact,
        isSlashGame: torf,
        embed: {
          title: 'Trivia',
          color: `${process.env.ec}`,
        },
      }).startGame();
    }
    function wordle(){
      new Wordle({
        message: interact,
        isSlashGame: torf,
        embed: {
          title: 'Wordle',
          color: `${process.env.ec}`,
        },
      }).startGame();
    }
    return { ctfRandom, footBallRandom, twozerofoureight, catchTheFish, flood, footBall, hangMan, rockPaperScissors, slots, snake, tictactoe, trivia, wordle }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  kill(target, author){
    var kills = [
      ` after a long day, plops down on the couch with ${target} and turns on The Big Bang Theory. After a Sheldon Cooper joke, ${target} laughs uncontrollably as they die.`,
      `${author} Alt+F4'd ${target}.exe!`,
      `${author} attempted to play a flute, exploding the head of ${target}.`,
      `${author} blew his ear drums out listening to music too hard.`,
      `${author} challenges ${target} to a fist fight to the death. ${target} wins.`,
      `${author} cleaves the head of ${target} with a keyboard.`,
      `${author} crushes ${target} with a fridge.`,
      `${author} decapitates ${target} with a sword.`,
      `${author} drags ${target}s ears too hard and rips them off.`,
      `${author} drowns ${target} in a beer barrel.`,
      `${author} drowns ${target} in a tub of hot chocolate. *How was your last drink?*`,
      `${author} eviscerates ${target} with a rusty butter knife. Ouch!`,
      `${author} feeds toothpaste-filled oreos to ${target}, who were apparently allergic to fluorine. GGWP.`,
      `${author} fell in love with ${target} then broke his heart literally.`,
      `${author} fires a supersonic frozen turkey at ${target}, killing them instantly.`,
      `${author} forgot to leave the car door window open and ${target} dies from overheating`,
      `${author} forgot to zombie-proof ${target} lawn... Looks like zombies had a feast last night.`,
      `${author} gets ${target} to watch anime with them. ${target} couldn't handle it.`,
      `${author} grabs ${target} and shoves them into an auto-freeze machine with some juice and sets the temperature to 100 Kelvin, creating human ice pops.`,
      `${author} hired me to kill you, but I don't want to! ${target}`,
      `${author} hugs ${target} too hard..`,
      `${author} hulk smashes ${target} into a pulp.`,
      `${author} killed ${target} by ripping the skin off of their face and making a mask out of it.`,
      `${author} kills ${target} after hours of torture.`,
      `${author} kills ${target} with a candlestick in the study`,
      `${author} kills ${target} with kindness`,
      `${author} kills ${target} with their own foot.`,
      `${author} murders ${target} with an axe.`,
      `${author} pressed delete. It deleted ${target}`,
      `${author} pushes ${target} into the cold vacuum of space.`,
      `${author} runs ${target} over with a PT Cruiser.`,
      `${author} shoots ${target} in the head.`,
      `${author} shoots in ${target} mouth with rainbow laser, causing ${target} head to explode with rainbows and ${target} is reborn as unicorn. :unicorn:`,
      `${author} shot ${target} using the Starkiller Base!`,
      `${author} slips bleach into ${target}'s lemonade.`,
      `${author} strangles ${target}.`,
      `${author} straps ${target} to an ICBM and sends them to North Korea along with it.`,
      `${author} strikes ${target} with the killing curse... *Avada Kedavra!*`,
      `${author} tears off ${target}s lips after a kiss.`,
      `${author} thicc and collapses ${target}'s rib cage`,
      `${author} tries to shoot the broad side of a barn, misses and hits ${target} instead.`,
      `${author} turns on Goosebumps(2015 film) on the TV. ${target} being a scaredy-cat, dies of an heart attack.`,
      `${author} was so swag that ${target} died due to it. #Swag`,
      `${author}, are you sure you want to kill ${target}? They seem nice to me.`,
      `${target} accidentally clicked on a popup ad that reads \`Doctors hate us, see the one best trick for dying today!\``,
      `${target} accidentally tripped and died while getting up to write their suicide note.`,
      `${target} ate a piece of exotic butter. It was so amazing that it killed them.`,
      `${target} ate an apple and turned out it was made out of wax. Someone died from wax poisoning later that day.`,
      `${target} ate too many laxatives and drowned in their own shit. Ew.`,
      `${target} bleeds out after trying to get on \`Dumbest hillbilly moments\`.`,
      `${target} bought a fidget spinner and drowned in pussy.`,
      `${target} can't be killed, as they are a ghost.`,
      `${target} chokes in a trash can.`,
      `${target} chokes on a chicken bone.`,
      `${target} chokes on cheerios and dies. What an idiot...`,
      `${target} cranks up the music system only to realize the volume was at max and the song playing was Baby by Justin Beiber...`,
      `${target} cums in eye, goes blind, runs for help but ran straight onto train tracks and gets plowed by a train.`,
      `${target} decided it was a good idea to fight a tiger while smelling like meat. It did not end well.`,
      `${target} did not make a meme dank enough and was stoned.`,
      `${target} died after fapping 50 times in a row with no break.`,
      `${target} died after gaming for 90 hours straight without moving or eating.`,
      `${target} died after playing with an edgy razor blade fidget spinner.`,
      `${target} died after realizing how shitty their grammar was`,
      `${target} died after trying to out-meme Dank Memer.`,
      `${target} died an honorable death. Death by snoo snoo.`,
      `${target} died because RemindMeBot forgot to remind them to breathe`,
      `${target} died because they started playing with a fidget spinner but they realise its 2016 so you start fapping to the old witch in snow white and obama starts mowing their lawn and they jump out of the window and get ripped to pieces by Obama's lawn mower`,
      `${target} died due to ${author} being so stupid`,
      `${target} died due to eating WAY too many hotdogs in preparation for their date Friday night.`,
      `${target} died eating expired and infected raw fish with the filthiest rice in the world as sushi while being constantly stabbed in the scrotum with a 9inch nail sharp enough to stab through kevlar. The soy sauce was cat piss.`,
      `${target} died from a high salt intake`,
      `${target} died from a swift kick to the brain.`,
      `${target} died from a tragic amount of bad succ`,
      `${target} died from doing the ice bucket challenge.`,
      `${target} died from drinking too much water Huh, I guess it IS possible!.`,
      `${target} died from eating cactus needles.`,
      `${target} died from eating too much ass.`,
      `${target} died from eating too much bread :/`,
      `${target} died from ebola.`,
      `${target} died from meme underdose :/`,
      `${target} died from not eating enough ass.`,
      `${target} died from not whacking it enough. (There's a healthy balance, boys)`,
      `${target} died from reposting in the wrong neighborhood`,
      `${target} died from shitting for 36 hours straight.`,
      `${target} died from swallowing rocks too fast`,
      `${target} died from too many sunburns.`,
      `${target} died from whacking it too much. (There's a healthy balance, boys)`,
      `${target} died of oversucc`,
      `${target} died when testing a hydrogen bomb. There is nothing left to bury.`,
      `${target} died while listening to 'It's every day bro'`,
      `${target} died while playing hopscotch on *seemingly* deactivated land mines.`,
      `${target} died while trying to find the city of England`,
      `${target} died. OOF`,
      `${target} dies after swallowing a toothpick.`,
      `${target} dies at the hands of ${author}.`,
      `${target} dies because they used a bobby pin to lift their eyelashes`,
      `${target} dies because they were just too angry.`,
      `${target} dies by swearing on a Christian Minecraft server`,
      `${target} dies due to lack of friends.`,
      `${target} dies from bad succ.`,
      `${target} dies from dabbing too hard.`,
      `${target} dies from dabbing too hard`,
      `${target} dies from disrespecting wahmen.`,
      `${target} dies from just being a bad, un-likeable dude.`,
      `${target} dies from posting normie memes.`,
      `${target} dies from severe dislike of sand. It's coarse and rough and irritating it gets everywhere`,
      `${target} dies from watching the emoji movie and enjoying it.`,
      `${target} dies in a horrible accident, and it was engineered by ${author}.`,
      `${target} dies north of the wall and transforms into a white walker`,
      `${target} dies of AIDS.`,
      `${target} dies of dysentery.`,
      `${target} dies of natural causes.`,
      `${target} dies of starvation.`,
      `${target} dies on death row via lethal injection after murdering ${author} and their family.`,
      `${target} dies, but don't let this distract you from the fact that in 1998, The Undertaker threw Mankind off Hell In A Cell, and plummeted 16 ft through an announcer’s table`,
      `${target} dies.`,
      `After a struggle, ${target} kills ${author}`,
      `${target} disappeared from the universe.`,
      `${target} drank some toxic soda before it was recalled.`,
      `${target} dropped a Nokia phone on their face and split their skull.`,
      `${target} drowned in their own tears.`,
      `${target} eats too much copypasta and explodes`,
      `${target} fell down a cliff while playing Pokemon Go. Good job on keeping your nose in that puny phone. :iphone:`,
      `${target} fell into a pit of angry feminists.`,
      `${target} gets hit by a car.`,
      `${target} gets stabbed by ${author}`,
      `${target} gets struck by lightning.`,
      `${target} goes genocide and Sans totally dunks ${target}!`,
      `${target} got into a knife fight with the pope. One of them is in hell now.`,
      `${target} got stepped on by an elephant.`,
      `${target} died from eating too much ass.`,
      `${target} has a stroke after a sad miserable existence. They are then devoured by their ample cats.`,
      `${target} has been found guilty, time for their execution!`,
      `${target} has some bad chinese food, and pays the ultimate price.`,
      `${target} is abducted by aliens, and the government kills them to cover it up.`,
      `${target} is dead at the hands of ${author}.`,
      `${target} is injected with chocolate syrup, which mutates them into a person made out of chocolate. While doing a part-time job at the Daycare, they are devoured by the hungry babies. :chocolate_bar:`,
      `${target} is killed by a rabbit with a vicious streak a mile wide`,
      `${target} is killed by their own stupidity.`,
      `${target} is killed in a robbery gone wrong.`,
      `${target} is not able to be killed. Oh, wait, no, ${author} kills them anyway.`,
      `${target} is so dumb that they choked on oxygen.`,
      `${target} is stuffed into a suit by Freddy on their night guard duty. Oh, not those animatronics again!`,
      `${target} is sucked into Minecraft. ${target}, being a noob at the so called Real-Life Minecraft faces the Game Over screen.`,
      `${target} killed themselves after seeing the normie memes that ${author} posts.`,
      `${target} kills themselves after realizing how dumb ${author} is.`,
      `${target} lives, despite ${author}'s murder attempt.`,
      `${target} loses the will to live`,
      `${target} presses a random button and is teleported to the height of 100m, allowing them to fall to their inevitable death. Moral of the story: Don't go around pressing random buttons.`,
      `${target} reads memes till they die.`,
      `${target} ripped his heart out..`,
      `${target} ripped their own heart out to show their love for ${author}.`,
      `${target} screams in terror as they accidentally spawn in the cthulhu while uttering random latin words. Cthulhu grabs ${target} by the right leg and takes them to his dimension yelling, \`Honey, Dinner's ready!\``,
      `${target} slipped in the bathroom and choked on the shower curtain.`,
      `${target} slips on a banana peel and falls down the stairs.`,
      `${target} spins a fidget spinner and when it stops he dies...`,
      `${target} steps on a george foreman and dies of waffle foot.`,
      `${target} takes an arrow to the knee. And everywhere else.`,
      `${target} talked back to mods and got destroyed by the ban hammer.`,
      `${target} tips his fedora too far and falls onto the tracks of an oncoming subway.`,
      `${target} tried to get crafty, but they accidentally cut themselves with the scissors.:scissors:`,
      `${target} tried to get famous on YouTube by live-streaming something dumb. Skydiving while chained to a fridge.`,
      `${target} tried to outrun a train, the train won.`,
      `${target} tried to pick out the holy grail. He chose... poorly.`,
      `${target} tried to play in the street...`,
      `${target} trips over his own shoe laces and dies.`,
      `${target} vocally opposed the Clintons and then suddenly disappeared.`,
      `${target} was a resident of Alderaan before Darth Vader destroyed the planet...`,
      `${target} was accused of stealing Neptune's crown...`,
      `${target} was charging their Samsung Galaxy Note 7...`,
      `${target} was eaten alive by ants`,
      `${target} was given a chance to synthesize element 119 (Ununennium) and have it named after them, but they messed up. R.I.P.`,
      `${target} was killed by ${author} with baby wipes.`,
      `${target} was murdered by ${author} and everyone knows it, but there is no proof.`,
      `${target} was scooped by ${author} and their innards are now Ennard.`,
      `${target} was teleported to the timeline where Jurassic World was real and they were eaten alive by the Indominus Rex.`,
      `${target} was thrown in the crusher of a trash truck by ${author}.`,
      `${target} was walking normally when out of the corner of their eye they saw someone do a bottle flip and dab causing ${target} to have a stroke.`,
      `${target} watched the Emoji Movie and died of sheer cringe.`,
      `${target} went on a ride with a lead balloon.`,
      `After getting pushed into the ocean by ${author}, ${target} is eaten by a shark.`,
      `After raid of roblox kids entered the server, ${target} died of cancer.`,
      `Aids, ${target} died from aids.`,
      `Calling upon the divine powers, ${author} smites ${target} and their heathen ways`,
      `In a sudden turn of events, I **don't** kill ${target}.`,
      `Our lord and savior Gaben strikes ${target} with a lighting bolt.`,
      `Sorry, ${author}, I don't like killing people.`,
      `The bullet missed Harambe and hit ${target} instead. Yay for Harambe!`,
      `While performing colonoscopy on an elephant, ${target} gets their head stuck in the elephants rectum and chokes.`,
    ];
    return `${titlecase(kills[Math.floor(Math.random() * kills.length)])}`
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}