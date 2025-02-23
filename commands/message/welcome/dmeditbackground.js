const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageDmEditBackground extends Command {
	constructor(client){
		super(client, {
			name: "dmeditbackground",
  			category: "welcome",
  			alias: ["dmedtbg", "deditbg", "deb"],
  			cooldown: 5,
  			usage: `${process.env.prefix}welcomeeditbackground <background>`,
  			description: "Edit Welcome Image Background When A User Join's Server.",
		});
	}
	async run(client, message, args){

        let text2 = args.join(" ");
        let validurl = await client.functions.isValidImgUrl(text2);
        const welcomedmdb = client.db.table(`welcomedm`);
		const welcomedmconfigurationdb = client.db.table(`welcomedmconfiguration`);
		const welcomedmcheck = await welcomedmdb.get(`${message.guild.id}`);
		const welcomedmconfigurationcheck = await welcomedmconfigurationdb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
            if(!text2){
                return msgdefer.edit({ content: `> Enter Background Url That Should Be Displayed In User Welcome Image Background When A Use Joined Server.` });
            } else if(!validurl){
                return msgdefer.edit({ content: `> Invlaid Url. Url Must Have Image Type Extension At Last.` })
            } else {
				if(!welcomedmcheck){
					return await msgdefer.edit({ content: `> You Have Not Setup Welcome Dm-User System Yet. Use "${process.env.prefix}dmset <on/off>" Command To Setup Welcome Dm-User System.` })
				} else {
					await msgdefer.edit({ content: `> Done✅. Welcome Channel Welcome Image Background Now Updated In Dm.` })
					.then(async() => {
						let text1 = welcomedmconfigurationcheck?.text || null;
						let color1 = welcomedmconfigurationcheck?.color || null;
                		await welcomedmconfigurationdb.set(`${message.guild.id}`, {
                    		text: text1,
                    		color: color1,
                    		thumbnail: text2 
                		})
					})
				}
            }
        }
	}
};