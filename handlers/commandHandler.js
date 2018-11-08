const COLOR = require('chalk');
const parseArgs = require('../methods/parseArgs')

module.exports = async message => {
    try {
        let guildModel = await message.client.database.models.guild.findOne({
            attributes: [ 'enabled', 'prefix', 'musicTextChannel', 'musicVoiceChannel', 'musicMasterRole', 'disabledCommands' ],
            where: {
               guildID: message.guild.id
            }
        });

        if (!guildModel.enabled) return;

        // Add guild's prefix to the discord.js guild object to minimize database reads.
        if (!message.guild.prefix) {
            message.guild.prefix = guildModel.dataValues.prefix;
        }
    
        let prefix = message.guild.prefix;

        if (!message.content.startsWith(prefix)) return;

        let args = message.content.trim().replace(/ +/g, ' ').split(' ');
        
        let command = args.shift().slice(prefix.length).toLowerCase();

        if (message.client.commands.has(command)) {
            message.client.command = message.client.commands.get(command);
        } else if (message.client.aliases.has(command)) {
            message.client.command = message.client.commands.get(message.client.aliases.get(command).toLowerCase());
        } else return;

        /* TODO:
         *   - Add user command cooldown if command has ran successfully.
         *   - Add command args parse and handler.
         *      - Add command error handler.
         */

        await message.client.command.exec(message.client, message, await parseArgs(message.client.commands.get(command), args));
    } catch (e) {
        process.stdout.write(`${COLOR.red('[Error]')} commandHandler: ${e}`);
    }
}