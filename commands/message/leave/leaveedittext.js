const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageLeaveEditText extends Command {
	constructor(client){
		super(client, {
			name: "leaveedittext",
  			category: "leave",
  			alias: ["lvedttxt", ";edittext", "let"],
  			cooldown: 5,
  			usage: `${process.env.prefix}leaveedittext <text>`,
  			description: "Edit Text Leave Message When A User Leave Server.",
		});
	}
	async run(client, message, args){

        let text1 = args.join(" ");
		const leavesetdb = client.db.table(`leave`);
		const leaveconfigurationdb = client.db.table(`leaveconfiguration`);
		const leavesetcheck = await leavesetdb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
            if(!text1){
                return msgdefer.edit({ content: `> Enter Text That Should Be Displayed When A Use Leave Server.` });
            } else {
				if(!leavesetcheck){
					return await msgdefer.edit({ content: `> You Have Not Setup Leave System Yet. Use "${process.env.prefix}leaveset <channelMention>" Command To Setup v System.` })
				} else {
					await msgdefer.edit({ content: `> Done✅. Leave Channel Text Now Updated.` })
					.then(async() => {
                		await leaveconfigurationdb.set(`${message.guild.id}`, text1);
                    })
                }
            }
        }
	}
};