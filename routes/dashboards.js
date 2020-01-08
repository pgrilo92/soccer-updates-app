const express = require('express')
const router = express.Router()
const dashboardCtrl = require('../controllers/dashboards')

router.get('/', dashboardCtrl.index)

module.exports = router