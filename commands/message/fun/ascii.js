const Command = require('../../../structures/MessageCommandClass');
const figlet = require('figlet');

module.exports = class MessageAscii extends Command {
	constructor(client) {
		super(client, {
			name: "ascii",
  			category: "fun",
  			alias: ["asci", "aci"],
  			cooldown: 3,
  			usage: `${process.env.prefix}ascii`,
  			description: "Convert Normal Text To Ascii Text.",
		});
	}
	async run(client, message, args) {

		const text = args.join(" ");

        figlet.text(text, async function(err, data){
            if(err){
                message.reply({ content: client.functions.errorMsg() });
            } else if(data.length > 2000){
                message.reply({ content: `> Please Decrease The Length Of The Sentence.` });
            } else if(text.length > 20){
                message.reply({ content: ` \`\`\`20 Character Only Allowed For Message Command. You Can Use More Characters In Slash Command To Use Slash Command Type "/ascii"\`\`\` ` });
			} else if(text.length < 20){
                message.reply({ content: ` \`\`\`${data}\`\`\` ` });
			}
        }) 

	}
};