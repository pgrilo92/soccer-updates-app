var express = require('express');
var router = express.Router();


const playersCtrl = require('../controllers/players')

/* GET home page. */
router.get('/', playersCtrl.find);


module.exports = router;
