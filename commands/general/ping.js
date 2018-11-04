
const { RichEmbed } = require('discord.js');

exports.exec = function (client, message, args) {
    try {
        let ping = new Date();

        let embed = new RichEmbed()
            .setColor('#36393f')
            .setTitle(`:ping_pong: Ping!`)
        message.channel.send({ embed }).then(resultMessage =>{
            let pong = Math.floor(new Date() - ping);
            embed = new RichEmbed()
                .setColor('#36393f')
                .setTitle(`:ping_pong: Pong! \`${pong}ms\``)
            resultMessage.edit({ embed });
        });
        
    } catch (err) {
        message.client.log.error(err);
    }
}

exports.help = {
    "name": "ping"
}

exports.config = {
    "aliases": []
}