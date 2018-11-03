const COLOR = require('chalk');

module.exports = async client => {
    try {
        client.user.setPresence({
            status: client.configurations.status,
            game: {
                name: typeof client.configurations.game.name === 'string' ? client.configurations.game.name : client.configurations.game.length ? client.configurations.game.name[0] : null,
                type: client.configurations.game.type,
                url: client.configurations.game.url && client.configurations.game.url.trim().length ? client.configurations.game.url : null
            }
        });

        if (typeof client.configurations.game.name !== 'string' && client.configurations.game.name.length) {
            client.setInterval(async () => {
                try {
                    await client.user.setActivity(client.configurations.game.name[Math.floor(Math.random() * client.configurations.game.name.length)],
                    {
                        type: client.configurations.game.type,
                        url: client.configurations.game.url && client.configurations.game.url.trim().length ? client.configurations.game.url : null
                    });
                } catch (err) {
                    client.log.error(err);
                }
            },  ((typeof client.configurations.game.interval === 'number' && client.configurations.game.interval) || 60) * 60 * 1000);
        }
    } catch (err) {
        client.log.error(err);
        process.exit(1);
    }

    let clientGuilds = client.guilds.map(g => g.id);
    let guilds = await client.database.models.guild.findAll({
        attributes: [ 'guildID' ]
    });
    guilds = guilds.map(guild => guild.guildID);

    /*
     * Add guilds to the DB which was added Client when it was offline.
     */
    for (let i = 0; i < clientGuilds.length; i++) {
      let found = false;
      for (let j = 0; j < guilds.length; j++) {
        if (clientGuilds[i] === guilds[j]) {
          found = true;
          break;
        }
      }
      if (found === false) {
        await client.database.models.guild.create({
          guildID: clientGuilds[i]
        },
        {
          fields: [ 'guildID' ]
        });
      }
    }

    let bootTime = Math.floor(process.uptime());

    client.log.console(COLOR`\n{blue BassBox} v${client.package.version}`);
    //client.log.console(COLOR`{gray ${client.package.url}}`);

    client.log.console(COLOR`\n{gray </> by Bryan Tran}`);

    client.log.console(COLOR`\n{blue [${client.user.username}]:} I'm ready!\n`);

    client.log.console(COLOR`{green [  SERVERS]:} ${client.guilds.size}`);
    client.log.console(COLOR`{green [   PREFIX]:} ${client.configurations.prefix.join(' ')}`);
    client.log.console(COLOR`{green [ COMMANDS]:} ${client.commands.size}`);
    client.log.console(COLOR`{green [BOOT TIME]:} ${bootTime}s`);
    
}