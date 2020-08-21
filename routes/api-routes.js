let router = require('express').Router();
const controller = require('../controller/controller')

router.post('/data', controller.createData)
module.exports = router;
