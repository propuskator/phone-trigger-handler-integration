const bodyParser = require('body-parser');

module.exports = bodyParser.json({ limit  : 1024 * 1024,
    verify : (req, res, buf) => {
        /* c8 ignore next 12*/
        try {
            JSON.parse(buf);
        } catch (e) {
            res.send({
                status : 0,
                error  : {
                    code    : 'BROKEN_JSON',
                    message : 'Please, verify your json'
                }
            });
            throw new Error('BROKEN_JSON');
        }
    }
});
