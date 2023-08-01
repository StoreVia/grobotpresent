const Command = require('../../../structures/MessageCommandClass');

module.exports = class MessageTicTacToe extends Command {
	constructor(client){
		super(client, {
			name: "tictactoe",
  			category: "games",
  			alias: ["ttt"],
  			cooldown: 3,
  			usage: `${process.env.prefix}tictactoe <userMention>`,
  			description: "Play TicTacToe Game.",
		});
	}
	async run(client, message){

        let opponent = message.mentions.members.first();
        if(!opponent){
            return await message.reply({ content: `> Mention A Person With Whom You Want To Play TicTacToe.` })
        } else {
            await client.functions.games(message, false).tictactoe(opponent);
        }
	}
};