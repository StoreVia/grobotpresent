const Command = require('../../../structures/Commands/MessageCommandClass');
const { ButtonStyle } = require(`discord.js`);

module.exports = class MessagePoll extends Command {
	constructor(client){
		super(client, {
			name: "poll",
  			category: "utility",
  			alias: ["pol", "pll"],
  			cooldown: 5,
  			usage: `${process.env.prefix}poll <Option1> <Option2>`,
  			description: "Conduct A Poll.",
		});
	}
	async run(client, message, args){
		
		let msgdefer = await client.functions.deferReply().message(message);
        const [choice1, choice2] = args;
		const buttonRow = await client.functions.buttons(`1️⃣`, `pchoice1`, ButtonStyle.Secondary, `2️⃣`, `pchoice2`, ButtonStyle.Secondary);

		if(choice1.length > 100 || choice2.length> 100){
            return msgdefer.edit({ content: `> You Should Enter Sentence Which Is less Than 100 Characters.` })
        } else {
            let embed = await client.functions.embedBuild().title(`Poll Conducted By \`${message.author.username}\``).description(`🅰: **${choice1}**\n\n🅱: **${choice2}**\n\n> **PollEndsIn: **<t:${Math.floor((Date.now() + 300000)/1000)}:R>`).footer().build();
            
            let message1 = await msgdefer.edit({ content: ``, embeds: [embed], components: [buttonRow] })
            await client.functions.collector(message1).poll(choice1, choice2, embed, buttonRow);
        }
	}
};