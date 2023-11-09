const dotProp            = require('dot-prop');
const { Logger }         = require('./Logger.js');
const { ForbiddenError } = require('./errors');
const { INVALID_CSRF }   = require('./errors/codes/forbidden');
const localizator        = require('./localization');

const logger = Logger('errorHandlers');

function logErrors(err, req, res, next) {
    logger.error(err);
    if (err.stack) logger.debug(err.stack);

    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err); // eslint-disable-line callback-return
    }
}

function errorHandler(err, req, res, next) {
    const locale = dotProp.get(req, 'headers.accept-language', 'en');

    if (err.code === 'EBADCSRFTOKEN') {
        const csrfErr = l(new ForbiddenError(INVALID_CSRF), locale);

        return res.status(403).send(csrfErr);
    }
    l(err, locale);

    if (err.type) {
        if (err.type === 'forbidden') {
            return res.status(403).send(err);
        }
        if (err.type === 'validation') {
            return res.status(422).send(err);
        }
        if (err.type === 'two_factor') {
            return res.status(499).send(err);
        }
    }
    if (res.headersSent && next) {
        return next(err);
    }
    res.status(500).send(err);
}

function l(err, locale) {
    err.message = localizator.l(err.message, locale);          // eslint-disable-line no-param-reassign
    err.errors = err.errors.map(el => {           // eslint-disable-line no-param-reassign
        return {
            message : localizator.l(el.message, locale),
            uri     : el.uri
        };
    });

    return err;
}

function dumpError(error) {
    return {
        type    : error.type || 'server_error',
        message : error.type && error.message
            ? error.message
            : 'Contact with your system administrator',
        errors : error.errors && error.type ? error.errors : []
    };
}

module.exports = {
    dumpError,
    logErrors,
    clientErrorHandler,
    errorHandler
};
