const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageHowGay extends Command {
	constructor(client) {
		super(client, {
			name: "howgay",
  			category: "fun",
  			alias: ["hg"],
  			cooldown: 3,
  			usage: `${process.env.prefix}howgay <userMention>`,
  			description: "Gay Calculator(Fun).",
		});
	}
	async run(client, message) {

		let user = message.mentions.members.first();
        let gaypercentage = await client.functions.randomNum(100).whole();
		let msgdefer = await client.functions.deferReply().message(message);

        if(!user){
			return msgdefer.edit({ content: `> Mention A User To Calculate Gay Percentage.` })
		} else {
            return await msgdefer.edit({ content: ``, embeds: [await client.functions.embedBuild().description(`${user} Is ${gaypercentage}% Gay`).build()]});
        }
	}
};