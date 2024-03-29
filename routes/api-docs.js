const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get(
    '/api-docs',
    swaggerUi.setup(swaggerDocument)
    /*
        #swagger.tags=['Api Documentation']
        #swagger.summary="Displays api documentation"
    */
);

module.exports = router;
