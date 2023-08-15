const Event = require('../../structures/Events/EventClass');
const { EmbedBuilder } = require('discord.js');
const titlecase = require(`titlecase`);

module.exports = class MessageCreate extends Event {
	constructor(client){
		super(client, {
			name: 'messageCreate',
			category: 'guild',
		});
	}
	async run(message){

		const client = this.client;

//commandruneventstart
        if(!message.guild || !message.channel || message.author.bot) return;
        if(message.channel.partial) await message.channel.fetch();
        if(message.partial) await message.fetch();
        const prefix = process.env.prefix;
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${client.functions.escapeRegex(prefix)})`);
        if(!prefixRegex.test(message.content)){
            const chatbot = client.db.table(`chatbot`)
            const chatbotcheck = await chatbot.get(`${message.guild.id}`)
            if(message.author.bot){
                return;
            } else {
                message.content = message.content
                    .replace(/@(everyone)/gi, "everyone")
                    .replace(/@(here)/gi, "here");
                if(chatbotcheck){
                    if(message.channel.id === chatbotcheck){
                        let text = message.content;
                        fetch(`http://api.brainshop.ai/get?bid=154409&key=iaRW35CrLdHBpOBW&uid=${message.author.id}&msg=${encodeURIComponent(text)}`)
                        .then(response => response.json())
                        .then(data => {
                            const text = data.cnt.toLowerCase()
                                .replace('<tips>', '**')
                                .replace('my dear great botmaster, acobot team.', 'Professor#0195')
                                .replace('i was created by acobot team.', 'Professor#0195')
                                .replace(`creeper chat bot`, `${client.user.username}`)
                                .replace('</tips>', '**');
                            message.reply({content: `${titlecase(text)}`})
                            message.channel.sendTyping();
                        })
                    }
                }
            }
            return;
        };
        const [, mPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(mPrefix.length).trim().split(/ +/).filter(Boolean);
        const cmd = args.length > 0 ? args.shift().toLowerCase() : null;
        let command = client.messagecommands.get(cmd);
        if(!command) command = client.messagecommands.get(client.aliases.get(cmd));
        if(command){
            if(client.functions.cmdCoolDown(message, command)){
                const embed = new EmbedBuilder()
                    .setDescription(`\`\`\`Time Left: ${cmdCoolDown(message, command)}s\`\`\``)
                    .setColor(`${process.env.ec}`)
                return message.reply({ embeds: [embed] });
            } else {
                return command.run(client, message, args);
            }
        }

//commandruneventend

//clientmentionstart
        if(message.content.includes(`<@${client.user.id}>`)){
            let embed = new EmbedBuilder()
                .setDescription(`To Get All Commands Use "**/help**" (or) "**${process.env.prefix}help**".`)
                .setColor(`${process.env.ec}`);
            message.reply({ embeds: [embed] })
        }
//clientmentionend
        
	}
};