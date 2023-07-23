const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, Embed } = require("discord.js");
const flip = require("flip-text");
const giphy = require("giphy-api")("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");
const akinator = require("../B_Gro_Modules/discord.js-akinator");
const fs = require('fs');
const https = require('https');
https.globalAgent.options.ca = fs.readFileSync('node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem');

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  howGay(){

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
    return giphy.search(string).then(async function(res) {
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
    function color() {
      embed.setColor(`#000000`);
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
    function footer(text, iconurl){
      embed.setFooter({ text: text ? text : `${client.user.username} - ${process.env.year} ©` , iconURL: iconurl ? iconurl : process.env.iconurl });
      return this;
    }
    function fields(...fieldSets) {
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 3) {
        const [name, value, inline] = fieldSets.slice(i, i + 3);
        realFields.push({ name, value, inline });
      }
      embed.addFields(...realFields);
      return this;
    }
    function ifields(...fieldSets) {
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 2) {
        const [name, value] = fieldSets.slice(i, i + 2);
        realFields.push({ name, value, inline: true });
      }
      embed.addFields(...realFields);
      return this;
    }
    function bfields(...fieldSets) {
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 3) {
        const [name, value, inline] = fieldSets.slice(i, i + 3);
        realFields.push({ name: `**${name}: **`, value, inline });
      }
      embed.addFields(...realFields);
      return this;
    }
    function ibfields(...fieldSets) {
      const realFields = [];
      for (let i = 0; i < fieldSets.length; i += 2) {
        const [name, value] = fieldSets.slice(i, i + 2);
        realFields.push({ name: `**${name}: **`, value, inline: true });
      }
      embed.addFields(...realFields);
      return this;
    }
    function build(){
      return embed;
    }
    return { author, title, description, thumbnail, image, fields, ifields, bfields, ibfields, color, footer, build };
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

  buttons(...values) {
    const buttonRow = new ActionRowBuilder();
    for (let i = 0; i < values.length; i += 3) {
      const [label, customId, style] = values.slice(i, i + 3);
      const button = new ButtonBuilder()
        .setLabel(`${label}`)
        .setCustomId(`${customId}`)
        .setStyle(style);
      buttonRow.addComponents(button);
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

  akilangEmbed(){
    let embed = new EmbedBuilder()
      .setTitle(`All Language Codes`)
      .setDescription(`**Usage: **\`${process.env.prefix}setakilang <langCode>\`\n\n<langcode> - <language>\n**en - English(Recommended)**\naf - Afghanistan\nam - Armenia\nar - Argentina\naz - Azerbaijan\nbe - Belarus\nbg - Bulgaria\nbn - Bangladesh\nbs - Bosnia and Herzegovina\nca - Canada\nceb - Cebuano\nco - Corsica\ncs - Czech\ncy - Welsh\nda - Danish\nde - German\nel - Greek\neo - Esperanto\nes - Spanish\n**en - English(Recommended)**\net - Estonian\neu - Basque\nfa - Persian\nfi - Finnish\nfr - French\nfy - West Frisian\nga - Irish\ngd - Scottish Gaelic\ngl - Galician\ngu - Gujarati\nha - Hausa\nhaw - Hawaiian\nhe - Hebrew\nhi - Hindi\nhmm - Hmong\nhr - Croatian\nht - Haitian Creole\nhu - Hungarian\nhy - Armenian\nid - Indonesian\nig - Igbo\nis - Icelandic\nit - Italian\niw - Hebrew (deprecated)\nka - Georgian\nkk - Kazakh\nkm - Khmer\nkn - Kannada\nko - Korean\nku - Kurdish\nky - Kyrgyz\nla - Latin\nlb - Luxembourgish\nlo - Lao\nlt - Lithuanian\nlv - Latvian\nmg - Malagasy\nmi - Maori\nmk - Macedonian\nml - Malayalam\nmn - Mongolian\nmr - Marathi\nms - Malay\nmt - Maltese\nmy - Burmese\nne - Nepali\nnl - Dutch\nno - Norwegian\nny - Chichewa\npa - Punjabi\npl - Polish\nps - Pashto\npt - Portuguese\nro - Romanian\nru - Russian\nsd - Sindhi\nsi - Sinhala\nsk - Slovak\nsl - Slovenian\nsm - Samoan\nsn - Shona\nso - Somali\nsq - Albanian\nsr - Serbian\nst - Southern Sotho\nsu - Sundanese\nsv - Swedish\nsw - Swahili\nta - Tamil\nte - Telugu\ntg - Tajik\nth - Thai\ntl - Filipino\ntr - Turkish\nuk - Ukrainian\nur - Urdu\nuz - Uzbek\nvi - Vietnamese\nxh - Xhosa\nyi - Yiddish\nyo - Yoruba\nzh-cn - Chinese (Simplified)\nzh-tw - Chinese (Traditional)\nzh - Chinese\nzu - Zulu `)
      .setColor(`${process.env.ec}`)
      .setFooter({
        text: `${client.user.username} - ${process.env.year} ©`, 
        iconURL: process.env.iconurl
      });
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

  errorMsg(){
    function bug(){
      return `> Error Occured Please Try Later Or Use "/report" To Report The Bug.`
    }
    function vc(){
      return `> Please Make Sure You Are In A Voice Channel.`
    }
    return { bug, vc }
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