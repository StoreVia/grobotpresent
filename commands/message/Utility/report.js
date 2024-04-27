const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageReport extends Command {
	constructor(client){
		super(client, {
			name: "report",
  			category: "utility",
  			alias: ["reprt", "rprt", "rpt"],
  			cooldown: 5,
  			usage: `${process.env.prefix}report <issue>`,
  			description: "Report Any Bug Or Suggest Something For Bot Implimentation.",
		});
	}
	async run(client, message, args){
		
		const query = args.join(" ");
		let msgdefer = await client.functions.deferReply().message(message);
		let report = await client.functions.report(message, query, `mt`);
		
		if(!query){
			return await msgdefer.edit({ content: `> Please Report Something Or Suggest Something.` })
		} else {
			return await msgdefer.edit({ content: ``, embeds: [report.embed] });
		}
	}
};