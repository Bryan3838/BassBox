const fs = require('fs');
const path = require('path');
const color = require('chalk');
const { RichEmbed } = require('discord.js');

exports.exec = async function (client, message, args) {
    try {
        message.reply('I\'m sending you the list of commands in your direct messages.');

        let modules = fs.readdirSync('./commands').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());

        let loadTime = new Date();

        let general = '';
        let moderation = '';
        let music = '';

        for (let module of modules) {
            let commandFiles = fs.readdirSync(path.resolve('./commands/', module)).
                filter(file => !fs.statSync(path.resolve('./commands/', module, file)).isDirectory()).
                filter(file => file.endsWith('.js'));
            for (let file of commandFiles) {
                file = file.replace(/\.js$/i, '');
                if (module == 'general') {
                    general += `• !${file}\n`;
                }
                else if (module == 'moderation') {
                    moderation += `• !${file}\n`;
                }
                else if (module == 'music') {
                    music += `• !${file}\n`;
                }
            }
        }
        //temp
        moderation = "lol";
        music = "lol";
        //
        loadTime = Math.floor(new Date() - loadTime);

        let embed = new RichEmbed()
            .setAuthor('Commands', message.guild.iconURL)
            .setColor('#36393f')
            .addField('General', general)
            .addField('Moderation', moderation)
            .addField('Music', music)
            .setFooter(`commands: ${message.client.commands.size} | Prefix: | Took ${loadTime}ms`, message.author.displayAvatarURL)
        await message.author.send({ embed });

        let link = await client.generateInvite(["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS",
        "MANAGE_GUILD", "ADD_REACTIONS", "READ_MESSAGES", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", 
        "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS",
        "DEAFEN_MEMBERS", "MOVE_MEMBERS", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]);

        embed = new RichEmbed()
            .setAuthor('Additional Links')
            .setColor('#36393f')
            .setDescription(`[Bot Invite](${link})`)
        await message.author.send({embed});

    } catch(err) {
        message.client.log.error(err);
    }
}

exports.help = {
    "name": "help"
}

exports.config = {
    "aliases": []
}