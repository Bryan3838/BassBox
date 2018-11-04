const COLOR = require('chalk');

const handleCommand = require('../handlers/commandHandler');
const filterInvite = require('../filters/inviteFilter.js');
module.exports = async message => {
    try {
        if (message.author.bot) return;

        if (message.guild) {
            if (await filterInvite(message)) return;

            handleCommand(message);
        }
    } catch (err) {
        message.client.log.error(err);
    }
}