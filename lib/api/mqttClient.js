const MQTTTransport = require('homie-sdk/lib/Broker/mqtt');
const { Logger }    = require('../utils/Logger');
const config        = require('../../etc/config');

const logger = Logger('MqttClient');

class MqttClient {
    constructor({ mqtt }) {
        if (config.mode === 'unit-tests') return;

        logger.info('Configuration', mqtt);
        this.transport = new MQTTTransport({ ...mqtt });
        // this.transport.debug = logger;
        // this.transport.debug.log = logger.verbose;
    }

    async init() {
        logger.info('Connecting...');
        await this.transport.connect();
        logger.info('Connected.');
    }

    publish(topic, value) {
        logger.silly('publish', { topic, value });

        return this.transport.publish(topic, value, { retain: false });
    }
}

module.exports = new MqttClient(config);
