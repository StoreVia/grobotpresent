const Command = require('../../../structures/Commands/MessageCommandClass');
const { ButtonStyle } = require('discord.js');

module.exports = class InteractionCatchTheFish extends Command {
	constructor(client){
		super(client, {
			name: "catchthefish",
  			category: "games",
  			alias: ["ctf"],
  			cooldown: 3,
  			usage: `${process.env.prefix}ctf <no.of Fishes Below 10>`,
  			description: "Play CatchTheFish Game.",
		});
	}
	async run(client, message, args){

        let count = args.join(" ");
        let msgdefer = await client.functions.deferReply().message(message);

        if(!count){
            return await msgdefer.edit({ content: `> Mention No.of Fishes You Want To Catch(below 10).` })
        } else if(!(count = parseInt(count))){
			return await msgdefer.edit({ content: `> The no.of Fishes Must Be An Integer. Eg: ${process.env.prefix}ctf 3.` })
		} else if(count < 1){
			return await msgdefer.edit({ content: `> The no.of Fishes Must Be 1 (Or) Greater Than 1.` })
		} else if(count > 10){ 
            return await msgdefer.edit({ content: "> Number Should Be Less Than Or Equal To 10." })
        } else {
            const componentsArray = await client.functions.buttons(`Stop`, `e`, ButtonStyle.Danger, `🎣`, `${String(Math.random())}`, ButtonStyle.Primary, `Stop`, `ee`, ButtonStyle.Danger);
            let msg = await msgdefer.edit({ content: `Catch ${count} Fishes To Win!\n\n${await client.functions.games().ctfRandom().randomPos}`, components: [componentsArray] })
            await client.functions.games().catchTheFish(msg, count, componentsArray, message.author.id);
        }
	}
};