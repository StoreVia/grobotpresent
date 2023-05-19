const Event = require('../../structures/EventClass');
const { InteractionType, EmbedBuilder } = require('discord.js');
const db = require(`quick.db`);
const Discord = require(`discord.js`);
const version = require(`../../package.json`).version;
const Canvas = require('canvas');
const canv = require('canvas'),
    canvas = canv.createCanvas(1018, 468),
    ctx = canvas.getContext('2d');
const canvacord = require("canvacord");

module.exports = class GuildMemberAdd extends Event {
	constructor(client) {
		super(client, {
			name: 'guildMemberAdd',
			category: 'guild',
		});
	}
	async run(member) {

		const client = this.client;

        let server = db.fetch(`welcome_${member.guild.id}`)
        let guildCh = client.channels.cache.get(server)
        let welcomedmuser = db.fetch(`welcomedm_${member.guild.id}`)
        let color = db.fetch(`welcometextcolor_${member.guild.id}`) || "FFFFFF";
        let avatarcolor = color;
        let backgroundurl = db.fetch(`welcomebg_${member.guild.id}`) || "https://images5.alphacoders.com/112/1123013.jpg";

        if(welcomedmuser === "off"){
            return;
        }
        if(welcomedmuser === "on"){
            const row = new Discord.ActionRowBuilder()
			    .addComponents(
				    new Discord.ButtonBuilder()
					    .setCustomId('welcome_dm')
					    .setLabel(`From Server: ${member.guild.name}`)
                        .setDisabled(true)
					    .setStyle(Discord.ButtonStyle.Secondary),
			    );
            let dmtext = db.fetch(`welcomedmtext_${member.guild.id}`) || "<MemberMention>, Welcome To <ServerName>."
            const text1 = dmtext.replace('<MemberMention>', `${member}`)
                .replace('<MemberCount>', `${member.guild.memberCount}`)
                .replace('<UserName>', `${member.user.username}`)
                .replace('<UserId>', `${member.user.id}`)
                .replace('<UserTag>', `${member.user.discriminator}`)
                .replace('<ServerName>', `${member.guild.name}`)
                .replace('<ServerId>', `${member.guild.id}`);
            
            member.send({ content: `${text1}`, files: [{ attachment: `https://api.aniket091.xyz/welcomecard?avatar=${member.user.displayAvatarURL({ dynamic: true, size: 4096, extension: "jpg" })}&name=${member.user.username}&title=Welcome&message=${member.guild.memberCount}th Member&background=${backgroundurl}&textcolor=${color}&avatarcolor=${avatarcolor}`, name: 'image.png'}], components: [row]})
        }

        if (!server) {
            return;
        }
        if (server) {
            let text = db.fetch(`welcometext_${member.guild.id}`) || "<MemberMention>, Welcome To <ServerName>."
            const text1 = text.replace('<MemberMention>', `${member}`)
                .replace('<MemberCount>', `${member.guild.memberCount}`)
                .replace('<UserName>', `${member.user.username}`)
                .replace('<UserId>', `${member.user.id}`)
                .replace('<UserTag>', `${member.user.discriminator}`)
                .replace('<ServerName>', `${member.guild.name}`)
                .replace('<ServerId>', `${member.guild.id}`);
    
            guildCh.send({ content: `${text1}`, files: [{ attachment: `https://api.aniket091.xyz/welcomecard?avatar=${member.user.displayAvatarURL({ dynamic: true, size: 4096, extension: "jpg" })}&name=${member.user.username}&title=Welcome&message=${member.guild.memberCount}th member&background=${backgroundurl}&textcolor=${color}&avatarcolor=${avatarcolor}`, name: 'image.png'}]})
        }
	}
};