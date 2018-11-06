
const { RichEmbed } = require('discord.js');

exports.exec = async function (client, message, args) {
    try {
        let ping = new Date();

        let embed = new RichEmbed()
            .setColor('#36393f')
            .setTitle(`:ping_pong: Ping!`)
        await message.channel.send({ embed }).then(async resultMessage =>{
            let pong = Math.floor(new Date() - ping);
            embed = new RichEmbed()
                .setColor('#36393f')
                .setTitle(`:ping_pong: Pong! \`${pong}ms\``)
            await resultMessage.edit({ embed });
        });
        
    } catch (err) {
        message.client.log.error(err);
    }
}

exports.help = {
    name:'ping',
    description: '',
    userTextPermission: '',
    userVoicePermission: '',
    usage: '',
    example: [],
}

exports.config = {
    aliases: [],
    enabled: true,
    argsDefinitions: []
}