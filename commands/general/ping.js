
exports.exec = function (client, message, args) {
    try {
        let ping = new Date();
        message.channel.send("Pong!").then(resultMessage => {
            let pong = Math.floor(new Date() - ping);
            resultMessage.edit(`Pong! \`${pong}ms\``);
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