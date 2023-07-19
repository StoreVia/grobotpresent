const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection } = require("discord.js");
const flip = require("flip-text");
const giphy = require("giphy-api")("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");

module.exports = class Functions {
  constructor(client) {
    this.client = client;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  collector(msg){
    function dice(userId, embed, buttonRow){
      const filter = i => i.customId;
		  const collector = msg.createMessageComponentCollector({ filter, idle: 300000 });
      collector.on('collect', async (i) => {
			  if (i.user.id != userId) {
				  await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			  } else if(i.customId === `dice`) {
				  i.update({ embeds: [embed.setDescription(`🎲 You Got \`${await Math.floor(Math.random() * 6) + 1}\``)], components: [buttonRow]})
			  } else if(i.customId === `distop`){
          buttonRow.components.map(component=> component.setDisabled(true));
				  await i.update({ components: [buttonRow] });
			  }
		  });
		  collector.on('end', async (_, reason) => {
			  if (reason === 'idle' || reason === 'user') {
				  buttonRow.components.map(component=> component.setDisabled(true));
				  await msg.edit({ components: [buttonRow] });
			  }
		  });
    }
    return { dice }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  gif(string){
    const client = this.client;
    let gif = giphy.search(string).then(async function(res) {
      let id = await res.data[0].id;
      let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`;
      const embed = new EmbedBuilder()
        .setTitle(`${string}`)
        .setImage(msgurl)
        .setColor(`${process.env.ec}`)
        .setFooter({
          text: `${client.user.username} - ${process.env.year} ©`, 
          iconURL: process.env.iconurl
        });
      return embed;
    })
    return gif;
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

  embed(){
    function onlyDescription(text){
      const embed = new EmbedBuilder()
				.setDescription(text)
				.setColor(`${process.env.ec}`)
			return embed;
    }
    return { onlyDescription }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async randomNum(num){
    const random = Math.floor(Math.random() * num) + 1;
    return await random;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  buttons(){
    function two(label1, id1, label2, id2){
      const buttonRow = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel(`${label1}`)
            .setCustomId(`${id1}`)
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setLabel(`${label2}`)
            .setCustomId(`${id2}`)
            .setDisabled(false)
            .setStyle(ButtonStyle.Danger),
        )
      return buttonRow;
    }
    return { two }
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
  
  activityInfoEmbed(vc, req){
    let embed = new EmbedBuilder()
      .setColor(`${process.env.ec}`)
      .addFields(
        { name: `**RequestedBy: **`, value: `${req}`, inline: true },
        { name: `\u200b`, value: `\u200b`, inline: true },
        { name: `**VoiceChannel: **`, value: `${vc}`, inline: true }
      )
    return embed;
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  pingEmbed(api, latency){
    let embed = new EmbedBuilder()
      .setColor(`${process.env.ec}`)
      .addFields(
        { name: '**🟢 Api: **', value: `> \`${api} ms\``,inline: true },  
        { name: '**🏓 Latency: **', value: `> \`${latency} ms\``, inline: true },
      )
    return embed;
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  akilangEmbed() {
    let embed = new EmbedBuilder()
      .setTitle('All Language Codes')
      .setDescription(`**Usage: **\`${process.env.prefix}setakilang <langCode>\`\n\n<langcode> - <language>\n**en - English(Recommended)**\naf - Afghanistan\nam - Armenia\nar - Argentina\naz - Azerbaijan\nbe - Belarus\nbg - Bulgaria\nbn - Bangladesh\nbs - Bosnia and Herzegovina\nca - Canada\nceb - Cebuano\nco - Corsica\ncs - Czech\ncy - Welsh\nda - Danish\nde - German\nel - Greek\neo - Esperanto\nes - Spanish\n**en - English(Recommended)**\net - Estonian\neu - Basque\nfa - Persian\nfi - Finnish\nfr - French\nfy - West Frisian\nga - Irish\ngd - Scottish Gaelic\ngl - Galician\ngu - Gujarati\nha - Hausa\nhaw - Hawaiian\nhe - Hebrew\nhi - Hindi\nhmm - Hmong\nhr - Croatian\nht - Haitian Creole\nhu - Hungarian\nhy - Armenian\nid - Indonesian\nig - Igbo\nis - Icelandic\nit - Italian\niw - Hebrew (deprecated)\nka - Georgian\nkk - Kazakh\nkm - Khmer\nkn - Kannada\nko - Korean\nku - Kurdish\nky - Kyrgyz\nla - Latin\nlb - Luxembourgish\nlo - Lao\nlt - Lithuanian\nlv - Latvian\nmg - Malagasy\nmi - Maori\nmk - Macedonian\nml - Malayalam\nmn - Mongolian\nmr - Marathi\nms - Malay\nmt - Maltese\nmy - Burmese\nne - Nepali\nnl - Dutch\nno - Norwegian\nny - Chichewa\npa - Punjabi\npl - Polish\nps - Pashto\npt - Portuguese\nro - Romanian\nru - Russian\nsd - Sindhi\nsi - Sinhala\nsk - Slovak\nsl - Slovenian\nsm - Samoan\nsn - Shona\nso - Somali\nsq - Albanian\nsr - Serbian\nst - Southern Sotho\nsu - Sundanese\nsv - Swedish\nsw - Swahili\nta - Tamil\nte - Telugu\ntg - Tajik\nth - Thai\ntl - Filipino\ntr - Turkish\nuk - Ukrainian\nur - Urdu\nuz - Uzbek\nvi - Vietnamese\nxh - Xhosa\nyi - Yiddish\nyo - Yoruba\nzh-cn - Chinese (Simplified)\nzh-tw - Chinese (Traditional)\nzh - Chinese\nzu - Zulu `)
      .setFooter({
        text: `${this.client.user.username} - ${process.env.year} ©`, 
        iconURL: process.env.iconurl
      })
      .setColor(`${process.env.ec}`);
    return embed;
  }

  errorMsg(){
    return `> Error Occured Please Try Later Or Use "/report" To Report The Bug.`
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
    return { string, user, channel, integer, number, role }
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  isValidURL(url){
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    return pattern.test(url);
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  cmdCoolDown(message, command) {
    let client = message.client;
    if(!message || !client) return;
    if(!command || !command.name) return;
    if(!client.cooldowns.has(command.name)){
      client.cooldowns.set(command.name, new Collection());
    }
    const time = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown) * 1000;
    if (time.has(`${message.member.id}`)) {
      const expirationTime = time.get(message.member.id) + cooldownAmount;
      if (Date.now() < expirationTime) {
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
  
  escapeRegex(str) {
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
    if (invite.error || !invite.code) return console.log('An Error Occured While Genrating Link.');
    return `https://discord.com/invite/${invite.code}`;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}