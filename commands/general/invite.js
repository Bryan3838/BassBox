const color = require('chalk');
const { RichEmbed } = require('discord.js');

exports.exec = async function (client, message, args) {
    try {
        message.reply('I\'m sending you my invite links in your direct messages.')

        let link = await client.generateInvite(["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS",
        "MANAGE_GUILD", "ADD_REACTIONS", "READ_MESSAGES", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", 
        "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS",
        "DEAFEN_MEMBERS", "MOVE_MEMBERS", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]);

        let embed = new RichEmbed()
            .setAuthor('Links')
            .setColor('#36393f')
            .setDescription(`[Bot Invite](${link})`)
        await message.author.send({embed});

    } catch(err) {
        message.client.log.error(err);
    }
}

exports.help = {
    name: 'invite',
    description: '',
    userTextPermission: '',
    userVoicePermission: '',
    usage: '',
    example: [],
}

exports.config = {
    aliases: ['inv'],
    enabled: true,
    argsDefinitions: []
}