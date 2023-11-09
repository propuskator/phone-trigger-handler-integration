const makeServiceRunner = require('../makeServiceRunner');
const HandleTrigger     = require('../services/HandleTrigger');

module.exports = {
    handleTrigger : makeServiceRunner(HandleTrigger, req => req.body)
};
