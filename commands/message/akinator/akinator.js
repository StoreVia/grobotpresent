const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageAkinator extends Command {
	constructor(client) {
		super(client, {
			name: "akinator",
  			category: "akinator",
  			alias: ["aki"],
  			cooldown: 3,
  			usage: `${process.env.prefix}akinator`,
  			description: "Play Akinator Game.",
		});
	}
	async run(client, message) {
		
        let langdb = client.db.table(`akinatorlanguage`);
        let langdbcheck = await langdb.get(`${message.author.id}`);

        if(!langdbcheck){
            return message.reply(`Please Select Your Akinator Language By Using Following Comamnd :\n> \`${process.env.prefix}setakilang\``)
        } else {
            return await client.functions.akinator(message, langdbcheck);
        }
	}
};