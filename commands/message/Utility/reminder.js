const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageReminder extends Command {
	constructor(client){
		super(client, {
			name: "reminder",
  			category: "utility",
  			alias: ["remind", "rmind"],
  			cooldown: 5,
  			usage: `${process.env.prefix}reminder <time(eg:- 10s, 10min, 10h)> <reason>`,
  			description: "Set A Reminder.",
		});
	}
	async run(client, message, args){
		
		let time = args.join(" ");
        let reason = interaction.options.getString("reason");
        let functions = await client.functions.reminder(interaction, time, reason);

        await interaction.deferReply({ ephemeral: true});
		return await interaction.followUp({ embeds: [functions.embed] });
	}
};