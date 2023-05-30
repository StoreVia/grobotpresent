const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { P } = require('flip-text/lib/chars');
const { increment } = require('libsodium-wrappers');
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
            let enteredkey = interaction.options.getString(`redeem_code`);
            let avilablekeys = await keys.get(`premium.keys`)
            let usedkeys = await used.get(`premium.keys`);
            let arrayKeys = Array.isArray(avilablekeys) ? avilablekeys : [];
            let filterarrayKeys = Array.isArray(usedkeys) ? usedkeys : [];
            let filteredKeys = arrayKeys.filter(key => !filterarrayKeys.some(usedKey => usedKey === key));
            try{
                let check = avilablekeys.some(value => value === enteredkey)
                if(!check){
                    interaction.followUp({ content: `> Premium Key Not Found.` })
                } if(check){
                    if(!filteredKeys.includes(`${enteredkey}`)){
                        return interaction.followUp({ content: `> Premium Key Already Used.` })
                    } else if(filteredKeys.includes(`${enteredkey}`)){
                        let activatecheck = await activatedkey.get(`${interaction.user.id}`)
                        if(activatecheck){
                            let activatedtime = await activatedkey.get(`${interaction.user.id}`)
                            let [key, time] = activatedtime[0].keyandtime.split(',');
                            if(process.env.premium_timeout - (Date.now() - time.trim()) > 0){
                                return interaction.followUp({ content: `> You Have Active Premium Subscription. You Can Activate New Subscription After The Present Subscription Expired.` })
                            } else if(process.env.premium_timeout - (Date.now() - time.trim()) < 0){
                                await used.push(`premium.keys`, `${enteredkey}`)
                                await activatedkey.delete(`${interaction.user.id}`)
                                await activatedkey.push(`${interaction.user.id}`, {keyandtime:`${enteredkey}, ${Date.now()}`} )
                                interaction.followUp({ content: `> Done✅.Your New Premium Key Has Been Activated.` })
                            }
                        } else {
                            await used.push(`premium.keys`, `${enteredkey}`)
                            await activatedkey.push(`${interaction.user.id}`, {keyandtime:`${enteredkey}, ${Date.now()}`} )
                            interaction.followUp({ content: `> Done✅.Your Premium Key Has Been Activated.` })
                        }
                    }
                }
            } catch(e) {
                console.log(e)
                return interaction.followUp({ content: `> Premium Key Not Found.` })
            }
        }

        if(subcommand === "check"){
            let activatedfetch = await activatedkey.get(`${interaction.user.id}`)

            if(activatedfetch){
                let [key, time] = activatedfetch[0].keyandtime.split(',');
                let timeleft = ms(process.env.premium_timeout - (Date.now() - time.trim()));
                if(process.env.premium_timeout - (Date.now() - time.trim()) > 0){
                    const embed = new EmbedBuilder()
                        .setTitle(`Time Left For Your Premium`)
                        .setDescription(`\`\`\`${timeleft.days}Days, ${timeleft.hours}Hrs, ${timeleft.minutes}Min, ${timeleft.seconds}Sec\`\`\``)
                        .setFooter({
                            text: `${client.user.username} - ${process.env.year} ©`, 
                            iconURL: process.env.iconurl
                        })
                        .setColor(`${process.env.ec}`);
                    return interaction.followUp({ embeds: [embed] })
                } else if(process.env.premium_timeout - (Date.now() - time.trim()) < 0){
                    return interaction.followUp({ content: `> Your Premium Subscription Is Expired. Renew It Buy Using "/premium buy" Command.(Applied Charges)` })
                }
            } else if(!activatedfetch){
                return interaction.followUp({ content: `> There Is No Recent Premium Subscription In Your Account.` })
            }
            
        }

        
	}
};