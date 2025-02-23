const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageDmSet extends Command {
	constructor(client){
		super(client, {
			name: "dmset",
  			category: "welcome",
  			alias: ["dmst", "dset", "ds"],
  			cooldown: 5,
  			usage: `${process.env.prefix}dmset <on/off>`,
  			description: "Dm's User When Joined Server.",
		});
	}
	async run(client, message, args){

        const text = args.join(" ").toLowerCase();
		const welcomedmdb = client.db.table(`welcomedm`);
		const welcomedmcheck = await welcomedmdb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`});
        } else {
			if(!text){
                return msgdefer.edit({ content: `> Enter on/off After Entering Command With Prefix. Usage: **$dmset on/off**.`});
            } else if(text === "on"){
                if(welcomedmcheck){
                    return msgdefer.edit({ content: `> Welcome Message Through Dm Is Active In Your Server. If You Want To Make Any Changes Of The Dm Message Use "${process.env.prefix}dmedittext <text>" Command.` });
                } else {
                    await welcomedmdb.set(`${message.guild.id}`, "on");
                    return msgdefer.edit({ content: `> Done✅. Welcome Message Through Dm Is Now Activated In Your Server.` });
                }
            } else if(text === "off" || text === "of"){
                if(welcomedmcheck){
                    await welcomedmdb.delete(`${message.guild.id}`)
                    await msgdefer.edit({ content: `> Done✅. Welcome Message Through Dm Is Now Deactivated In Your Server.`});
                } else {
                    await msgdefer.edit({ content: `> Welcome Message Through Dm Is Deactivated Already.`});
                }
            } else {
                return await msgdefer.edit({ content: `> Welcome Message Through Dm Is Deactivated Already.`});
            }
		}
	}
};