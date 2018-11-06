const { RichEmbed } = require('discord.js');
module.exports = (message, command, missingArgs) => {
    try {
        let embed = new RichEmbed()
            .setTitle(':exclamation:Invalid Use')
            .setColor('#36393f')
            .setDescription(`That is not how you use \`${message.guild.prefix}${command.help.name}\`!`)
            .addField(`Missing Argument${missingArgs.length > 1 ? 's' : ''}`, `\`\`\`fix\n${missingArgs.join(', ')}\n\`\`\`\nUse the \`${message.guild.prefix}help ${command.help.name}\` to see an example of the \`${command.help.name}\` command.`)
        message.channel.send({ embed });
    } catch (err) {
        message.client.log.error(err);
    }
};