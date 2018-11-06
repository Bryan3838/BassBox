const fs = require('fs');
const path = require('path');
const COLOR = require('chalk');
const { RichEmbed } = require('discord.js');

exports.exec = async function (client, message, args) {
    try {
        if (args.command) {
            // parseExample method
            let embed = new RichEmbed()
                .setTitle(message.client.command.help.name')
                .setColor('#36393f')
                .setDescription(' temp ')
            message.channel.send({ embed });
        } else {
        
            message.reply('I\'m sending you the list of commands in your direct messages.');

            // Add help RichEmbed to discord client object to minimize file reads.
            if (!message.client.help.commands || !message.client.help.links) {
                let modules = fs.readdirSync('./commands').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());

                let loadTime = new Date();

                let general = '';
                let moderation = '';
                let music = '';
                let settings = '';

                for (let module of modules) {
                    let commandFiles = fs.readdirSync(path.resolve('./commands/', module)).
                        filter(file => !fs.statSync(path.resolve('./commands/', module, file)).isDirectory()).
                        filter(file => file.endsWith('.js'));
                    for (let file of commandFiles) {
                        file = file.replace(/\.js$/i, '');
                        if (module == 'general') {
                            general += `• !${file}\n`;
                        } else if (module == 'moderation') {
                            moderation += `• !${file}\n`;
                        } else if (module == 'music') {
                            music += `• !${file}\n`;
                        } else if (module == 'settings') {
                            settings += `• !${file}\n`;
                        }
                    }
                }
                //temp
                moderation = "lol";
                music = "lol";
                settings = "lol"
                //
                loadTime = Math.floor(new Date() - loadTime);

                let embed = new RichEmbed()
                    .setAuthor('Commands', message.guild.iconURL)
                    .setColor('#36393f')
                    .addField('General', general)
                    .addField('Moderation', moderation)
                    .addField('Music', music)
                    .addField('Settings', settings)
                    .setFooter(`commands: ${message.client.commands.size} • Server Prefix: ${message.guild.prefix} • Took ${loadTime}ms`, message.author.displayAvatarURL)
                message.author.send({ embed });
                message.client.help.commands = { embed };

                let link = await client.generateInvite(["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS",
                "MANAGE_GUILD", "ADD_REACTIONS", "READ_MESSAGES", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", 
                "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS",
                "DEAFEN_MEMBERS", "MOVE_MEMBERS", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]);

                embed = new RichEmbed()
                    .setAuthor('Additional Links')
                    .setColor('#36393f')
                    .setDescription(`[Bot Invite](${link})`)
                message.author.send({ embed });
                message.client.help.links = { embed };

                } else {
                    message.author.send(message.client.help.commands);
                    message.author.send(message.client.help.links);
                }
            }
        } catch(err) {
            message.client.log.error(err);
        }
}

exports.help = {
    name: 'help',
    description: '',
    userTextPermission: '',
    userVoicePermission: '',
    usage: '',
    example: [],
}

exports.config = {
    aliases: [],
    enabled: true,
    argsDefinitions: [
        {name: 'command', type: String, optional: true}
    ]
}
