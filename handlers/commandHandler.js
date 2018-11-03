const COLOR = require('chalk');

module.exports = async message => {
    try {
        //temporary
        let prefix = '!';

        if (!message.content.startsWith(prefix)) return;

        let args = message.content.split(' ');
        let command = args.shift().slice(prefix.length).toLowerCase();

        let cmd;
        if (message.client.commands.has(command)) {
            cmd = message.client.commands.get(command);
        }
        else if (message.client.aliases.has(command)) {
            cmd = message.client.commands.get(message.client.aliases.get(command).toLowerCase());
        }
        else return;

        cmd.exec(message.client, message, args);
    } catch (e) {
        process.stdout.write(`${COLOR.red('[Error]')} commandHandler: ${e}`);
    }
}