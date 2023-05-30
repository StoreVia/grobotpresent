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
        const used = client.db.table('premiumused')
        const activatedkey = client.db.table(`premiumactivated`)
        

        await interaction.deferReply({ ephemeral: true });
        let subcommand = interaction.options.getSubcommand()

        if(subcommand === "redeem"){
            let key = interaction.options.getString(`redeem_code`);
            let avilablekeys = await keys.get(`premium.keys`)
            let usedkeys = await used.get(`premium.keys`);
            let arrayKeys = Array.isArray(avilablekeys) ? avilablekeys : [];
            let filterarrayKeys = Array.isArray(usedkeys) ? usedkeys : [];
            let filteredKeys = arrayKeys.filter(key => !filterarrayKeys.some(usedKey => usedKey === key));
            let check = avilablekeys.some(value => value.includes(key))

            if(!check){
                interaction.followUp({ content: `> Premium Key Not Found.` })
            } else if(!filteredKeys.includes(`${key}`)){
                return interaction.followUp({ content: `> Premium Key Already Used.` })
            } else if(filteredKeys.includes(`${key}`)){
                if(check){
                    let activatedtime = activatedkey.get(`${interaction.user.id}`)
                    console.log(activatedtime)

                    if(process.env.premium_timeout - (Date.now() - activatedtime) > 0){
                    return interaction.followUp({ content: `> You Have Active Premium Subscription. You Can Activate New Subscription After The Present Expired` })
                    } else {
                        used.push(`premium.keys`, `${key}`)
                        activatedkey.push(`${interaction.user.id}`, {keyandtime:`${key}, ${Date.now()}`} )
                        interaction.followUp({ content: `> Done✅.Your Premium Key Has Been Activated.` })
                    }
                }
            }
        }

        if(subcommand === "check"){
            let user_premium_check = db.fetch(`activated_${interaction.user.id}`);
			let timeleft = db.fetch(`activatedtime_${interaction.user.id}`);
			let timeout = process.env.premium_timeout;
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