const router = require('express').Router();

router.use('/people', require('./people'));

module.exports = router;
