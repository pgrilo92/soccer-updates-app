const express = require('express')
const router = express.Router()
const dashboardCtrl = require('../controllers/dashboards')

router.get('/', (req, res) => {
    res.render('dashboards/index')
})

module.exports = router