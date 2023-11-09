const ServiceBaseModule = require('chista/ServiceBase');

const ServiceBase = ServiceBaseModule.default;

class BaseService extends ServiceBase {
    async execute() {
        throw new Error('Execute is not implemented!');
    }
}

module.exports = BaseService;
