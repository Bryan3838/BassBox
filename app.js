const Discord = require('discord.js');
const fs = require('fs');
const YAML = require('yaml');

const configurationsFile = fs.readFileSync('./settings/configurations.yaml', 'utf8');
const credentialsFile = fs.readFileSync('./settings/credentials.yaml', 'utf8');

const client = new Discord.Client();

client.configurations = YAML.parse(configurationsFile);
client.credentials = YAML.parse(credentialsFile);

client.log = require('./handlers/logHandler');

const Sequelize = require('sequelize');
client.database = new Sequelize(client.credentials.database.URI, {
  operatorsAliases: false,
  logging: false
});

client.database.authenticate().then(() => {

    // Populate Database/Implement model definitions
    require('./utils/models')(Sequelize, client.database);

    // Load Events
    require('./handlers/eventHandler.js')(client);

    const Modules = require('./handlers/moduleHandler.js');
    client.commands = Modules.commands;
    client.aliases = Modules.aliases;

    const modules = require('./handlers/moduleHandler.js');
    client.commands = modules.commands;
    client.aliases = modules.aliases;

    client.login(client.credentials.token).then(() => {

    });

}).catch(err => {
    client.log.error(err);
});

process.on('unhandledRejection', rejection => {
    console.warn('\n[unhandledRejection]');
    console.warn(rejection);
    console.warn('[/unhandledRejection]\n');
});