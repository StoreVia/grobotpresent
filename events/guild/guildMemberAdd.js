const Event = require('../../structures/Events/EventClass');
const db = require(`quick.db`);
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require(`discord.js`);

module.exports = class GuildMemberAdd extends Event {
	constructor(client){
		super(client, {
			name: 'guildMemberAdd',
			category: 'guild',
		});
	}
	async run(member){

		const client = this.client;

        const welcomesetdb = client.db.table(`welcome`);
		const welcomeconfigurationdb = client.db.table(`welcomeconfiguration`);
		const welcomedmdb = client.db.table(`welcomedm`);
		const welcomedmconfigurationdb = client.db.table(`welcomedmconfiguration`);
		const welcomesetcheck = await welcomesetdb.get(`${member.guild.id}`);
		const welcomeconfigurationcheck = await welcomeconfigurationdb.get(`${member.guild.id}`);
		const welcomedmcheck = await welcomedmdb.get(`${member.guild.id}`);
		const welcomedmconfigurationcheck = await welcomedmconfigurationdb.get(`${member.guild.id}`);

        if(welcomedmcheck){
            let color = welcomedmconfigurationcheck.color === null ? "FFFFFF" : welcomedmconfigurationcheck.color;
            let backgroundurl = welcomedmconfigurationcheck.thumbnail === null ? "https://i.pinimg.com/originals/fa/ab/f0/faabf039c3c9d50462c2e2dd660edd04.jpg" : welcomedmconfigurationcheck.thumbnail;
            const row = new ActionRowBuilder()
			    .addComponents(
				    new ButtonBuilder()
					    .setCustomId('welcome_dm')
					    .setLabel(`From Server: ${member.guild.name}`)
                        .setDisabled(true)
					    .setStyle(ButtonStyle.Secondary),
			    );
            let dmtext = welcomedmconfigurationcheck.text || "<MemberMention>, Welcome To <ServerName>."
            const text1 = dmtext.replace('<MemberMention>', `${member}`)
                .replace('<MemberCount>', `${member.guild.memberCount}`)
                .replace('<UserName>', `${member.user.username}`)
                .replace('<UserId>', `${member.user.id}`)
                .replace('<UserTag>', `${member.user.discriminator}`)
                .replace('<ServerName>', `${member.guild.name}`)
                .replace('<ServerId>', `${member.guild.id}`);
            
            member.send({ content: `${text1}`, files: [{ attachment: `https://api.gamecord.xyz/welcomecard?avatar=${member.user.displayAvatarURL({ dynamic: true, size: 4096, extension: "jpg" })}&name=${member.user.username}&title=Welcome&message=${member.guild.memberCount}th Member&background=${await backgroundurl}&textcolor=${await color}&avatarcolor=${await color}`, name: 'image.png'}], components: [row]})
        }

        if(welcomesetcheck){
            let color = welcomeconfigurationcheck.color === null ? "FFFFFF" : welcomeconfigurationcheck.color;
            let backgroundurl = welcomeconfigurationcheck.thumbnail === null ? "https://i.pinimg.com/originals/fa/ab/f0/faabf039c3c9d50462c2e2dd660edd04.jpg" : welcomeconfigurationcheck.thumbnail;
            let text = welcomeconfigurationcheck.text || "<MemberMention>, Welcome To <ServerName>."
            const text1 = text.replace('<MemberMention>', `${member}`)
                .replace('<MemberCount>', `${member.guild.memberCount}`)
                .replace('<UserName>', `${member.user.username}`)
                .replace('<UserId>', `${member.user.id}`)
                .replace('<UserTag>', `${member.user.discriminator}`)
                .replace('<ServerName>', `${member.guild.name}`)
                .replace('<ServerId>', `${member.guild.id}`);
    
            client.channels.cache.get(welcomesetcheck).send({ content: `${text1}`, files: [{ attachment: `https://api.gamecord.xyz/welcomecard?avatar=${member.user.displayAvatarURL({ dynamic: true, size: 4096, extension: "jpg" })}&name=${member.user.username}&title=Welcome&message=${member.guild.memberCount}th member&background=${await backgroundurl}&textcolor=${await color}&avatarcolor=${await color}`, name: 'image.png'}]})
        }
	}
};