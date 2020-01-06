var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('players/index', {title: "Top Scorers"})
});

module.exports = router;