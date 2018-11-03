const COLOR = require('chalk');

exports.warn = (...message) => {
    console.log(COLOR.yellow('[WARNING]'));
    console.warn(...message);
    console.log(COLOR.yellow('[/WARNING]'));
};

exports.error = (...message) => {
    console.log(COLOR.red('[ERROR]'));
    console.log(...message);
    console.trace();
    console.log(COLOR.red('[/ERROR]'));
};

exports.info = (...message) => {
    console.log(COLOR.blue('[BOT]: ') + message);
};

exports.console = (...message) => {
    console.log(...message);
};

exports.db = (...message) => {
    console.log(COLOR.cyan('[DATABASE]'));
    console.log(...message);
    console.trace();
    console.log(COLOR.cyan('[/DATABASE]'));
}