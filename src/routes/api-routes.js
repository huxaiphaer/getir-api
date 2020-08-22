let router = require('express').Router();
const controller = require('../controller/controller')

router.post('/data', controller.filterRecordsData)
router.get('/allData', controller.getAllRecords)
module.exports = router;
