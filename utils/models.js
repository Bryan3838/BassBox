const logger = require('../handlers/logHandler');
const fs = require('fs');
const YAML = require('yaml');

const configurationsFile = fs.readFileSync('./settings/configurations.yaml', 'utf8');
const { prefix } = YAML.parse(configurationsFile);

module.exports = (Sequelize, database) => {
    // Models
    database.define('settings', {
        botID: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        blacklistedGuilds: {
            type: Sequelize.JSON
        },
        blacklistedUers: {
            type: Sequelize.JSON
        }
    });

    const Guild = database.define('guild', {
        guildID: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        enabled: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        description: {
            type: Sequelize.BLOB
        },
        prefix: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: prefix ? [].concat(prefix) : [ '!' ]
        },
        greet: {
            type: Sequelize.STRING
        },
            greetMessage: {
            type: Sequelize.BLOB
        },
        greetTimeout: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        farewell: {
            type: Sequelize.STRING
        },
        farewellMessage: {
            type: Sequelize.BLOB
        },
        farewellTimeout: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        musicTextChannel: {
            type: Sequelize.STRING,
            unique: true
        },
            musicVoiceChannel: {
            type: Sequelize.STRING,
            unique: true
        },
        musicMasterRole: {
            type: Sequelize.STRING,
            unique: true
        },
        autoAssignableRoles: {
            type: Sequelize.JSON,
            unique: true
        },
        selfAssignableRoles: {
            type: Sequelize.JSON,
            unique: true
        },
        streamerRole: {
            type: Sequelize.STRING,
            unique: true
        },
        filterInvites: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        filterLinks: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        filterMentions: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        filterWords: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        filteredWords: {
            type: Sequelize.JSON
        },
        mentionSpamThreshold: {
            type: Sequelize.INTEGER,
            defaultValue: 5
        },
            mentionSpamAction: {
            type: Sequelize.STRING
        },
        warnThreshold: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        warnAction: {
            type: Sequelize.STRING
        },
        serverLog: {
            type: Sequelize.STRING,
            unique: true
        },
            moderationLog: {
            type: Sequelize.STRING,
            unique: true
        },
        moderationCaseNo: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 1
        },
        disabledCommands: {
            type: Sequelize.JSON
        },
        autoDeleteCommandOutput: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    // Associations
    Guild.Items = Guild.hasMany(Items, {
        foreignKey: 'guildID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    
    database.sync();

    return database.models();
}