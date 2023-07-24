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
		let msgdefer = await client.functions.deferReply().message(message);

        figlet.text(text, async function(err, data){
            if(err){
                msgdefer.edit({ content: await client.functions.errorMsg() });
            } else if(data.length > 2000){
                msgdefer.edit({ content: `> Please Decrease The Length Of The Sentence.` });
            } else if(text.length > 25){
                msgdefer.edit({ content: `> 25 Characters Are Only Allowed For Message Command. You Can Use More Than 25 Characters In Slash Command To Use Slash Command Type "/ascii". ` });
			} else if(text.length < 25){
                msgdefer.edit({ content: ` \`\`\`${data}\`\`\` ` });
			}
        }) 

	}
};