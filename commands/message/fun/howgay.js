const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageHowGay extends Command {
	constructor(client){
		super(client, {
			name: "howgay",
  			category: "fun",
  			alias: ["hg"],
  			cooldown: 3,
  			usage: `${process.env.prefix}howgay <userMention>`,
  			description: "Gay Calculator(Fun).",
		});
	}
	async run(client, message){

		let user = message.mentions.members.first();
        let gaypercentage = await client.functions.randomNum(100).whole();
		let msgdefer = await client.functions.deferReply().message(message);

        if(!user){
			return msgdefer.edit({ content: await client.functions.errorMsg().user() })
		} else {
            return await msgdefer.edit({ content: ``, embeds: [await client.functions.embedBuild().description(`${user} Is ${gaypercentage}% Gay`).build()]});
        }
	}
};