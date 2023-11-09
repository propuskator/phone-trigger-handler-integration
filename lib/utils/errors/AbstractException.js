const X          = require('../../Exception');
const { Logger } = require('../Logger');

const logger = Logger('Exception');

module.exports = class AbstractException extends X {
    constructor(code, payload = {}, exceptionClass) {
        if (!exceptionClass.codes[code]) {
            logger.error(`ERROR WITH CODE ${code} IS NOT HANDLED`);
            logger.error(payload);
            super({
                type    : 'unknown_error',
                message : payload.message || 'unknown_error',
                errors  : payload.errors || []
            });
        } else {
            super(exceptionClass.codes[code](payload));
        }
    }
};
