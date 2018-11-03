const color = require('chalk');
const { RichEmbed } = require('discord.js');
//test
module.exports = async message => {
    try {
        if (message.member && message.member.hasPermission('MANAGE_GUILD')) return;

        if (hasDiscordInvite(message.content)) {
            return deleteInvite(message);
        }

        let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
        if (!links) return;
        //const inviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/;
        //inviteRegex.test(message.content);
        for (let url of links) {
            if (hasDiscordInvite(url)) {
                return deleteInvite(message);
            }
        }
    }
    catch (e) {
        message.client.log.error(e);
    }

}
//use /gi
//add followURL (valid)
function hasDiscordInvite(string) {
    let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
  
    if (discordInvite.test(string)) return true;
    return false;
}

function deleteInvite(message) {
    if (message.deletable) {
        message.delete().catch(() => {});
    }

    let embed = new RichEmbed()
        .setColor('#3C70B5')
        .setDescription(`${message.author} you are not allowed to post server invite links here.`)
    message.channel.send({ embed })
    .then(msg => {
        msg.delete(5000).catch(() => {});
    }).catch(e => {
        message.client.log.error(e);
    });
    return true;
}
