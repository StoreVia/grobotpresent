const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageWelcomeEditText extends Command {
	constructor(client){
		super(client, {
			name: "welcomeedittext",
  			category: "welcome",
  			alias: ["wlcmedttxt", "wedittext", "wet"],
  			cooldown: 5,
  			usage: `${process.env.prefix}welcomeedittext <text>`,
  			description: "Edit Text Welcome Message When A User Join's Server.",
		});
	}
	async run(client, message, args){

        let text1 = args.join(" ");
		const welcomesetdb = client.db.table(`welcome`);
		const welcomeconfigurationdb = client.db.table(`welcomeconfiguration`);
		const welcomesetcheck = await welcomesetdb.get(`${message.guild.id}`);
		const welcomeconfigurationcheck = await welcomeconfigurationdb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
            if(!text1){
                return msgdefer.edit({ content: `Enter Text That Should Be Displayed When A Use Joined Server.` });
            } else {
				if(!welcomesetcheck){
					return await msgdefer.edit({ content: `> You Have Not Setup Welcome System Yet. Use "${process.env.prefix}welcomeset <channelMention>" Command To Setup Welcome System.` })
				} else {
					await msgdefer.edit({ content: `> Done✅. Welcome Channel Text Now Updated.` })
					.then(async() => {
						let background = welcomeconfigurationcheck?.thumbnail || null;
						let color1 = welcomeconfigurationcheck?.color || null;
                		await welcomeconfigurationdb.set(`${message.guild.id}`, {
                    		text: text1,
                    		color: color1,
                    		thumbnail: background 
                		})
					})
				}
            }
        }
	}
};