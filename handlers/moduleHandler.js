const fs = require('fs');
const COLOR = require('chalk');
const path = require('path');

const { Collection } = require('discord.js');

let commands = new Collection();
let aliases = new Collection();

let modules = fs.readdirSync('./commands').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());

let loadTime = new Date();

for (let module of modules) {
    process.stdout.write(`${COLOR.blue(`[Bot]`)} Loading ${module} module...\n`);

    let commandFiles = fs.readdirSync(path.resolve('./commands/', module)).
        filter(file => !fs.statSync(path.resolve('./commands/', module, file)).isDirectory()).
        filter(file => file.endsWith('.js'));

    for (let file of commandFiles) {
        file = file.substr(0, file.length-3);
        process.stdout.write(`${COLOR.blue(`[Bot]`)} Loading ${file} command...\n`);

        file = require(path.resolve('./commands/', module, file + '.js'));
        commands.set(file.help.name.toLowerCase(), file);

        for (let alias of file.config.aliases) {
            aliases.set(alias.toLowerCase(), file.help.name);
        }

        if (process.stdout.moveCursor && process.stdout.clearLine) {
             process.stdout.moveCursor(0, -1);
             process.stdout.clearLine();
        }
    }

    if (process.stdout.moveCursor && process.stdout.clearLine) {
         process.stdout.moveCursor(0, -1);
         process.stdout.clearLine();
    }
}

loadTime = Math.floor(new Date() - loadTime);
process.stdout.write(`${COLOR.blue(`[Bot]`)} Loaded ${commands.size} command${commands.size == 1 ? '' : 's'} in ${loadTime} ms.\n`);

exports.commands = commands;
exports.aliases = aliases;