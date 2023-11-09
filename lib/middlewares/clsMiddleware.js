const uuid         = require('uuid');
const clsNamespace = require('../utils/clsNamespace');
const { Logger }   = require('../utils/Logger');

const logger = Logger('clsMiddleware');

async function clsMiddleware(req, res, next) {
    // req and res are event emitters. We want to access CLS context inside of their event callbacks
    clsNamespace.bind(req);
    clsNamespace.bind(res);

    const traceID = uuid.v4();

    clsNamespace.run(() => {
        clsNamespace.set('traceID', traceID);

        logger.info({
            // url    : req.url,
            pathname : req._parsedUrl.pathname,
            method   : req.method,
            query    : req.query
        });

        next();
    });
}

module.exports = clsMiddleware;
