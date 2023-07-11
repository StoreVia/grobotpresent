const Command = require('../../../structures/MessageCommandClass');
const akinator = require("../../../B_Gro_Modules/discord.js-akinator");
const fs = require('fs');
const https = require('https');
https.globalAgent.options.ca = fs.readFileSync('node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem');

module.exports = class MessageAkinator extends Command {
	constructor(client) {
		super(client, {
			name: "akinator",
  			category: "akinator",
  			alias: ["aki"],
  			cooldown: 3,
  			usage: `${process.env.prefix}akinator`,
  			description: "Play Akinator Game.",
		});
	}

	async run(client, message) {
		
        let langdb = client.db.table(`akinatorlanguage`);
        let langdbcheck = await langdb.get(`${message.author.id}`);

        if(!langdbcheck){
            return message.channel.send(`Please Select Your Akinator Language By Using Following Comamnd :\n> \`${process.env.prefix}setakilang\``)
        } else {
            akinator(message, {
                language: langdbcheck,
                childMode: false,
                gameType: "character",
                useButtons: true,
                embedColor: process.env.ec
            })
        }
	}
};