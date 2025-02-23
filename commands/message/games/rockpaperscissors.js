const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageRockPaperScissors extends Command {
	constructor(client){
		super(client, {
			name: "rockpaperscissors",
  			category: "games",
  			alias: ["rps"],
  			cooldown: 5,
  			usage: `${process.env.prefix}rockpaperscissors <userMention>`,
  			description: "Play Rps Game.",
		});
	}
	async run(client, message){

        let opponent = message.mentions.members.first();
        if(!opponent){
            return await message.reply({ content: `> Mention A Person With Whom You Want To Play RockPaperScissors.` })
        } else {
            await client.functions.games(message, false).rockPaperScissors(opponent);
        }
	}
};