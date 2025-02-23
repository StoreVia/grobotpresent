const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageDmEditText extends Command {
	constructor(client){
		super(client, {
			name: "dmedittext",
  			category: "welcome",
  			alias: ["dmedttxt", "dedittext", "det"],
  			cooldown: 5,
  			usage: `${process.env.prefix}dmedittext <text>`,
  			description: "Edit Text Welcome Message In Dm When A User Join's Server.",
		});
	}
	async run(client, message, args){

        let text1 = args.join(" ");
		const welcomedmdb = client.db.table(`welcomedm`);
		const welcomedmconfigurationdb = client.db.table(`welcomedmconfiguration`);
		const welcomedmcheck = await welcomedmdb.get(`${message.guild.id}`);
		const welcomedmconfigurationcheck = await welcomedmconfigurationdb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
            if(!text1){
                return msgdefer.edit({ content: `Enter Text That Should Be Displayed When A Use Joined Server.` });
            } else {
				if(!welcomedmcheck){
					return await msgdefer.edit({ content: `> You Have Not Setup Welcome Dm-User System Yet. Use "${process.env.prefix}dmset <on/off>" Command To Setup Welcome Dm-User System.` })
				} else {
					await msgdefer.edit({ content: `> Done✅. Welcome Channel Text Now Updated In User Dm.` })
					.then(async() => {
						let background = welcomedmconfigurationcheck?.thumbnail || null;
						let color1 = welcomedmconfigurationcheck?.color || null;
                		await welcomedmconfigurationdb.set(`${message.guild.id}`, {
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