const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageWelcomeEditBackground extends Command {
	constructor(client){
		super(client, {
			name: "welcomeeditbackground",
  			category: "welcome",
  			alias: ["wlcmedtbg", "weditbg", "web"],
  			cooldown: 5,
  			usage: `${process.env.prefix}welcomeeditbackground <background>`,
  			description: "Edit Welcome Image Background When A User Join's Server.",
		});
	}
	async run(client, message, args){

        let text2 = args.join(" ");
        let validurl = await client.functions.isValidImgUrl(text2);
        const welcomesetdb = client.db.table(`welcome`);
		const welcomeconfigurationdb = client.db.table(`welcomeconfiguration`);
		const welcomesetcheck = await welcomesetdb.get(`${message.guild.id}`);
		const welcomeconfigurationcheck = await welcomeconfigurationdb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
            if(!text2){
                return msgdefer.edit({ content: `> Enter Background Url That Should Be Displayed In User Welcome Image Background When A Use Joined Server.` });
            } else if(!validurl){
                return msgdefer.edit({ content: `> Invlaid Url. Url Must Have Image Type Extension At Last.` })
            } else {
				if(!welcomesetcheck){
					return await msgdefer.edit({ content: `> You Have Not Setup Welcome System Yet. Use "${process.env.prefix}welcomeset <channelMention>" Command To Setup Welcome System.` })
				} else {
					await msgdefer.edit({ content: `> Done✅. Welcome Channel Welcome Image Background Now Updated.` })
					.then(async() => {
						let text1 = welcomeconfigurationcheck?.text || null;
						let color1 = welcomeconfigurationcheck?.color || null;
                		await welcomeconfigurationdb.set(`${message.guild.id}`, {
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