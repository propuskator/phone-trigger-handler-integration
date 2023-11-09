const config     = require('../etc/db.js');
const initModels = require('./models/initModels');

const { database, username, password, dialect, host, port, pool, logging } = config[process.env.NODE_ENV || 'development'];

module.exports = initModels({
    pool,
    logging,
    database,
    username,
    password,
    dialect,
    host,
    port
});
