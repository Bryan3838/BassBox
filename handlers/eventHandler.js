const fs = require('fs');
const path = require('path');

module.exports = client => {///
    let events = fs.readdirSync('./events').
        filter(file => !fs.statSync(path.resolve('./events/', file)).isDirectory()).
        filter(file => file.endsWith('.js'));

    for (let event of events) {
        event = event.replace(/\.js$/i, '');

        if (event === 'ready') {
            client.on(event, () => (require(path.resolve('./events', event))(client)));
        }
        else {
            client.on(event, require(path.resolve('./events', event)));
        }
    }
}