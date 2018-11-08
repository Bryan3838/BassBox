const { RichEmbed } = require('discord.js');
const si = require('systeminformation');
const moment = require('moment');

exports.exec = async function (client, message, args) {
    //whitespace: \u200b
    try {
        let cpu = await si.cpu();
        cpu = `${cpu.manufacturer} ${cpu.brand} ${cpu.manufacturer} @${cpu.speed}GHz`

        let version = `Discord.js: ${message.client.package.dependencies['discord.js'].replace('^', '')}\nNode.js: ${await si.versions().then(data => data.node)}`

        let time = await message.client.uptime;
        const s = Math.floor(time / 1000 % 60);
        const m = Math.floor(time / 1000 / 60 % 60);
        const h = Math.floor(time / 1000 / 60 / 60 % 24);
        const d = Math.floor(time / 1000 / 60 / 60 / 24);
  
        time = `${d === 0 ? `` : `${d}d `}${h === 0 ? `` : `${h}h `}${m === 0 ? `` : `${m}m `}${s}s`;
        let embed = new RichEmbed()
            .setAuthor(`${message.client.user.username} Status`, message.client.user.avatarURL)
            .setColor('#36393f')
            .addField(':map: Servers', `\`\`\`js\n${message.client.guilds.size}\n\`\`\``, true)
            .addField(':grinning: Users', `\`\`\`js\nUsers: ${message.client.users.size}\n\`\`\``, true)
            .addField(':pager: Channels', `\`\`\`js\n${message.client.channels.size}\n\`\`\``, true)
            .addField(':cloud: Latency', `\`\`\`js\n${Math.round(message.client.ping)}\n\`\`\``, true)
            .addField(':clock230: Uptime', `\`\`\`js\n${time}\`\`\``, true)
            .addField(':book: Libraries', `\`\`\`js\n${version}\`\`\``, true)
            .addField(':floppy_disk: Memory Usage', `\`\`\`js\n${Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100}MB\n\`\`\``, true)
            .addField(':computer: CPU', `\`\`\`js\n${cpu}\n\`\`\``, true)
            .attachFile('./images/Gradient.jpg')
            .setImage('attachment://Gradient.jpg')
            .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL)
            .setTimestamp();
        await message.channel.send({ embed });
        
    } catch (err) {
        message.client.log.error(err);
    }
}
exports.help = {
    name: 'status',
    description: '',
    userTextPermission: [],
    userVoicePermission: [],
    usage: '',
    examples: []
}

exports.config = {
    aliases: [],
    enabled: true,
    argsDefinitions: []
}