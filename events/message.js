const color = require('chalk');

const handleCommand = require('../handlers/commandHandler');
const handleInvite = require('../filters/inviteFilter.js');
module.exports = async message => {
    try {
        if (message.author.bot) return;

        handleInvite(message);

        handleCommand(message);
    } catch (err) {
        message.client.log.error(err);
    }
}