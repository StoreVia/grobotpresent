const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageTranslate extends Command {
	constructor(client){
		super(client, {
			name: "translate",
  			category: "utility",
  			alias: ["trnslte", "tslte"],
  			cooldown: 5,
  			usage: `${process.env.prefix}translate <langCode> <TextToBeTranslate>`,
  			description: "Translate Text From One Language To Another.",
		});
	}
	async run(client, message, args){
		
		const langCode = args.shift();
        const langText = args.join(" ");
		let msgdefer = await client.functions.deferReply().message(message);
		let embed = await client.functions.translate(langCode, langText);
		try{
            if(!langCode) {
                return await msgdefer.edit({ content: `> Use "$langcodes" To Get Info About All Language Codes.` });
            } else if(!langText) {
                return await msgdefer.edit({ content: `> Please Type Some Text To Translate.` });
            } else {
                return await msgdefer.edit({ content: ``, embeds: [embed] });
            }
        } catch(e){
            return await msgdefer.edit({ content: `> Use "$langcodes" To Get Info About All Language Codes.` });
        }
		
	}
};