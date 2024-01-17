const router = require('express').Router();

router.use('/', require('./api-docs'));

router.use('/users', require('./users'));

module.exports = router;
