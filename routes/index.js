let express = require('express');
let router = express.Router();
let passport = require('passport');

/* GET users listing. */
router.get('/', (req, res) => {
    res.redirect('/users')
});

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect : '/users',
        failureRedirect : '/users'
    }
));

  // OAuth logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/users');
});

module.exports = router;