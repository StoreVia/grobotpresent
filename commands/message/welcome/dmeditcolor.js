const Command = require('../../../structures/Commands/MessageCommandClass');

module.exports = class MessageDmEditColor extends Command {
	constructor(client){
		super(client, {
			name: "dmeditcolor",
  			category: "welcome",
  			alias: ["dmedtclr", "deditcolor", "dec"],
  			cooldown: 5,
  			usage: `${process.env.prefix}dmeditcolor`,
  			description: "Edit Text Color In Welcome Image In Dm When A User Join's Server.",
		});
	}
	async run(client, message){

        const welcomedmdb = client.db.table(`welcomedm`);
		const welcomedmconfigurationdb = client.db.table(`welcomedmconfiguration`);
		const welcomedmcheck = await welcomedmdb.get(`${message.guild.id}`);
		const welcomedmconfigurationcheck = await welcomedmconfigurationdb.get(`${message.guild.id}`);
		let msgdefer = await client.functions.deferReply().message(message);

		if(!await client.functions.permsCheck(`manageGuild`).message(message)){
            return msgdefer.edit({ content: `> You Need "Manage Guild" Permission To Use This Command.`})
        } else {
            if(!welcomedmcheck){
                return msgdefer.edit({ content: `> Enter Background Url That Should Be Displayed In User Welcome Image Background When A Use Joined Server.` });
            } else {
                let selectRow = await client.functions.listSelector(`Select An Color`, `colors`, false, 1, 1, `Black`, `000000`, `⬛`, `White`, `FFFFFF`, `⬜`, `Orange`, `FFA500`, `🟧`, `Blue`, `87CEEB`, `🟦`, `Red`, `FF0000`, `🟥`, `Brown`, `964B00`, `🟫`, `Purple`, `A020F0`, `🟪`, `Green`, `00FF00`, `🟩`, `Yellow`, `FFFF00`, `🟨`, `Stop`, `clrstop`, `🛑`);
                let embed = await client.functions.embedBuild().title(`Select The Color`).description(`Select One Of The Option Below.\n\n> Note :- **Selecting Color Changes Text Color In Welcome Image.**`).footer().build();
                let msg = await msgdefer.edit({ content: ``, embeds: [embed], components: [selectRow] });
                const filter = i => i.customId === "colors";
		        const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
		        collector.on('collect', async i => {
                    const selected = i.values[0];
			        if(i.user.id != message.author.id){
				        await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			        } else if(selected && selected != "clrstop"){
                        let text1 = welcomedmconfigurationcheck?.text || null;
                        let background = welcomedmconfigurationcheck?.thumbnail || null;
                        await welcomedmconfigurationdb.set(`${message.guild.id}`, {
                            text: text1,
                            color: selected,
                            thumbnail: background 
                        })
						selectRow.components.map(component=> component.setDisabled(true))
                        let embed = await client.functions.embedBuild().description(`> Done✅. Welcome Image Color Now Updated In Dm.`).build();
				        await i.update({ embeds: [embed], components: [selectRow] });
			        } else if(selected === "clrstop"){
						selectRow.components.map(component=> component.setDisabled(true))
				        await i.update({ components: [selectRow] });
			        }
		        })
		        collector.on('end', async (_, reason) => {
			        if(reason === 'idle' || reason === 'user'){
						selectRow.components.map(component=> component.setDisabled(true))
				        await msg.edit({ components: [selectRow] });
			        }
		        });
            }
        }
	}
};