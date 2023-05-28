module.exports = class Util {

	pingEmbed(api, latency){
        let embed = new EmbedBuilder()
            .setColor(`${process.env.ec}`)
            .addFields(
                { name: '**🟢 Api: **', value: `> \`${api} ms\``,inline: true },  
                { name: '**🏓 Latency: **', value: `> \`${latency} ms\``, inline: true },
            )
        return embed;
    }

};