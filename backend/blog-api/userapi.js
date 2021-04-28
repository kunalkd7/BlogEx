var express = require('express');
var router = express.Router();

//controllers
userapicontroller = require('./controllers/userapicontroller')

//middlewares
validator = require('./middleware/usersvalidation')


router.post('/signup', validator.signupvalidation,userapicontroller.signup);
router.post('/login',validator.login,userapicontroller.login)

module.exports = router;
