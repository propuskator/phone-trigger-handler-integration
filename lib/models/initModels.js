const Sequelize = require('sequelize');
const AccessSubject = require('./AccessSubject');
const AdminUser = require('./AdminUser');
const AccessTokenReader = require('./AccessTokenReader');

module.exports = function initAllModels(config) {
    const { database, username, password, dialect, host, port, pool, logging } = config;

    const sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect,
        pool,
        logging
    });

    const models = {
        AccessSubject,
        AccessTokenReader,
        AdminUser
    };

    Object.values(models).forEach(model => model.init(sequelize, { ...model.options() }));
    Object.values(models).forEach(model => model.initRelationsAndHooks(sequelize));

    return {
        ...models,
        sequelize,
        Op     : Sequelize.Op,
        dbName : database
    };
};
