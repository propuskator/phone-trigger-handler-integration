const express     = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/handle-call', controllers.trigger.handleTrigger);

module.exports = router;
