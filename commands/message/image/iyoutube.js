const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageIYoutube extends Command {
	constructor(client){
		super(client, {
			name: "iyoutube",
  			category: "image",
  			alias: ["iyutbe", "iyt"],
  			cooldown: 3,
  			usage: `${process.env.prefix}iyoutube <text>`,
  			description: "Add YoutubeComment Image Effect.",
		});
	}
	async run(client, message, args){

        let msgdefer = await client.functions.deferReply().message(message);
        let text = args.join(" ");

        if(!text){
            return await msgdefer.edit({ content: await client.functions.errorMsg().text() })
        } else {
            return await msgdefer.edit({ content: ``, files: [await client.functions.image(message.author).youTube(message.author.displayAvatarURL({ extension: 'png' }), message.author.username, `${text}`)] })
        }
	}
};