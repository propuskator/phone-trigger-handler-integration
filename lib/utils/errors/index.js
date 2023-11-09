const ForbiddenError  = require('./Forbidden');
const ValidationError = require('./Validation');
const ServerError     = require('./Server');
const {
    validation: validationCodes,
    forbidden: forbiddenCodes,
    server: serverCodes
} = require('./codes');

module.exports = {
    validationCodes,
    forbiddenCodes,
    serverCodes,
    ForbiddenError,
    ValidationError,
    ServerError
};

