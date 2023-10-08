const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageEightBall extends Command {
	constructor(client){
		super(client, {
			name: "8ball",
  			category: "games",
  			alias: ["8bal"],
  			cooldown: 5,
  			usage: `${process.env.prefix}8ball <question>`,
  			description: "Play 8Ball Game.",
		});
	}
	async run(client, message, args){

        let functions = client.functions;
		let msgdefer = await functions.deferReply().message(message);
        const question = args.join(" ");
    
        if(!question){
            return await msgdefer.edit({ content: `> Type A Question.` });
        } else {
            return await msgdefer.edit({ embeds: [await functions.embedBuild().title(`8Ball`).ibfields(`Your Question`, `${question}`, `Answer`, `${await functions.eightBall()}`).build()]});
        }
	}
};