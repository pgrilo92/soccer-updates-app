const express = require('express')
const router = express.Router()
let usersCtrl = require('../controllers/users')

router.get('/users', usersCtrl.index)

router.get('/', (req, res) => {
    res.render('dashboards/index')
})

module.exports = router