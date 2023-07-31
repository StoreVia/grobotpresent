const Command = require('../../../structures/MessageCommandClass');
const { ButtonStyle } = require('discord.js');

module.exports = class MessageFootBall extends Command {
	constructor(client){
		super(client, {
			name: "football",
  			category: "games",
  			alias: ["ft", "fotbal"],
  			cooldown: 3,
  			usage: `${process.env.prefix}football`,
  			description: "Play FootBall Game.",
		});
	}
	async run(client, message){

        let msgdefer = await client.functions.deferReply().message(message);
        const componentsArray = await client.functions.buttons(`Left`, `left`, ButtonStyle.Secondary, `Middle`, String(Math.random()), ButtonStyle.Primary, `Right`, `right`, ButtonStyle.Secondary);
		const msg = await msgdefer.edit({ content: await client.functions.games().footBallRandom().randomPos, components: [componentsArray] });
        await client.functions.games().footBall(msg, componentsArray, message.author.id);
	}
};