const fs = require('fs');
const path = require('path');

module.exports = Bot => {
    let events = fs.readdirSync('./events').
        filter(file => !fs.statSync(path.resolve('./events/', file)).isDirectory()).
        filter(file => file.endsWith('.js'));

    for (let event of events) {
        event = event.replace(/\.js$/i, '');

        if (event === 'ready') {
            Bot.on(event, () => require(path.resolve('./events', event + './js')(Bot)));
        }
        else {
            Bot.on(event, require(path.resolve('./events', event)));
        }
    }
}