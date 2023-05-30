const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const ms = require(`parse-ms-2`);

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('premium')
				.setDescription('Premium Utilities.')
                .addSubcommand(subcommand => 
                    subcommand.setName(`redeem`)
                        .setDescription(`Redeem You Premium Token.`)
				        .addStringOption(option =>
                            option.setName(`redeem_code`)
                                .setDescription(`Enter Your Premium Redeem Code.`)
                                .setRequired(true)))
                .addSubcommand(subcommand => 
                    subcommand.setName(`check`)
                        .setDescription(`Check Your Premium Time Left Period.`)),
			usage: 'ping',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const keys = client.db.table('premium')
        const usedkeys = client.db.table('premiumused')
        const activekey = client.db.table(`premiumactive`)

        await interaction.deferReply({ ephemeral: true });
        let subcommand = interaction.options.getSubcommand()

        if(subcommand === "redeem"){
            let key = interaction.options.getString(`redeem_code`);
            let check0 = await keys.get(`premium.keys`);
            let check = check0.includes(key)
            if(!check){
                return interaction.followUp({ content: `> Premium Key Not Found.` })
            } else if(check){
                    usedkeys.push(`premium.keys`, `${key}`)
                    activekey.psuh(`${interaction.user.id}.key`, `${key}`)
                    activekey.push(`${interaction.user.id}.time`, `${Date.now()}`)
        
                    interaction.followUp({ content: `> Done✅.Your Premium Key Has Been Activated.` })
                }
        }


        if(subcommand === "check"){
            let user_premium_check = db.fetch(`activated_${interaction.user.id}`);
			let timeleft = db.fetch(`activatedtime_${interaction.user.id}`);
			let timeout = 2592000000;
			let time = ms(timeout - (Date.now() - timeleft));

            if(!user_premium_check){
                interaction.followUp({ content: `> There Is No Activated Premium On Your Account.` })
            } else {
                const embed = new EmbedBuilder()
                    .setTitle(`Time Left For Your Premium`)
                    .setDescription(`\`\`\`${time.days}Days, ${time.hours}Hrs, ${time.minutes}Min, ${time.seconds}Sec\`\`\`\n Account_id: **${interaction.user.id}**`)
                    .setFooter({
                        text: `${client.user.username} - ${process.env.year} ©`, 
                       iconURL: process.env.iconurl
                     })
                    .setColor(`${process.env.ec}`);
                interaction.followUp({ embeds: [embed] })
            }
        }

        
	}
};