const AbstractException = require('./AbstractException');
const codes             = require('./codes/forbidden');

module.exports = class ForbiddenError extends AbstractException {
    constructor(code, payload = {}) {
        super(code, payload, ForbiddenError);
    }

    static get defaultError() {
        return {
            type    : 'forbidden',
            message : 'Forbidden error',
            errors  : []
        };
    }

    static get codes() {
        return {
            [codes.PERMISSION_DENIED] : () => ({
                ...this.defaultError,
                code    : codes.PERMISSION_DENIED,
                message : 'Permission denied'
            })
        };
    }
};
