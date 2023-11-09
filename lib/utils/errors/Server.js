const codes             = require('../errors/codes/server');
const AbstractException = require('./AbstractException');

module.exports = class ServerError extends AbstractException {
    constructor(code, payload = {}) {
        super(code, payload, ServerError);
    }

    static get defaultError() {
        return {
            type    : 'server_error',
            message : 'Contact with your system administrator',
            errors  : []
        };
    }

    static get codes() {
        return {
            [codes.DB_ERROR] : () => ({
                ...this.defaultError,
                code    : codes.DB_ERROR,
                message : 'Database error'
            })
        };
    }
};
