
exports.exec = function (client, message, args) {
    let ping = new Date();
    message.channel.send("Pong!").then(resultMessage => {
        let pong = Math.floor(new Date() - ping);
        resultMessage.edit(`Pong! \`${pong}ms\``);
    });
}

exports.help = {
    "name": "ping"
}

exports.config = {
    "aliases": []
}