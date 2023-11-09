require('dotenv').config();
require('./lib/registerValidationRules');
const express    = require('express');
const { Logger } = require('./lib/utils/Logger.js');
const config     = require('./etc/config');
const router     = require('./lib/router');
const {
    bodyParserJSON,
    clsMiddleware,
    urlencoded
} = require('./lib/middlewares');
const mqttClient = require('./lib/api/mqttClient');

const APP_PORT = config.port;

mqttClient.init();

const app    = express();
const logger = Logger('app');

logger.info(`PHONE_TRIGGER_HANDLER STARTING AT PORT ${APP_PORT}`);
app.listen(APP_PORT);

app.use(bodyParserJSON);
app.use(urlencoded);
app.use(clsMiddleware);
app.use('/api/v1', router);

module.exports = app;
