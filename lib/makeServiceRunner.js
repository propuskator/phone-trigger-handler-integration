const dotProp                     = require('dot-prop');
const formatValidationError       = require('./utils/validationErrorFormatter');
const hideSensitiveData           = require('./utils/hideSensitiveData');
const { errorHandler, dumpError } = require('./utils/errorHandlers');
const { Logger }                  = require('./utils/Logger.js');

function defaultResponseBuilder(req, res, next, result) {
    res.send(result);
}

module.exports = function makeServiceRunner(
    serviceClass,
    paramsBuilder,
    responseBuilder = defaultResponseBuilder
) {
    return async (req, res, next) => {
        let params;

        if (paramsBuilder && typeof paramsBuilder === 'function') {
            params = paramsBuilder(req);
        } else {
            params = {};
        }

        const context = dotProp.get(req, 'session.context', {});
        const service = new serviceClass({ context });
        const serviceClassName = service.constructor.name;
        const verboseTypes = service.constructor.verboseTypes;
        const logger = Logger(serviceClassName);

        service.logger = logger;

        try {
            // TODO Use logger with masking
            if (!verboseTypes || (!verboseTypes.silenced && verboseTypes.params)) {
                logger.info(`RUNNING SERVICE ${ serviceClass.name }`);
            }

            if (!verboseTypes || (!verboseTypes.silenced && verboseTypes.params)) {
                logger.info(`WITH PARAMS ${ JSON.stringify(hideSensitiveData(params)) }`);
            }
            const result = await service.run(params);

            if (!verboseTypes || (!verboseTypes.silenced && verboseTypes.result)) {
                logger.info(`RESULT: ${result && JSON.stringify(result)}`);
            }

            return responseBuilder(req, res, next, result);
        } catch (error) {
            logger.error(error);
            if (error.stack && process.env.IS_SHOW_ERROR_STACK_IN_LOGS) logger.debug(error.stack);
            let formattedError = error;

            if (error.code === 'FORMAT_ERROR') {
                formattedError = formatValidationError(error);
            }

            formattedError = dumpError(formattedError);

            return errorHandler(formattedError, req, res);
        }
    };
};
