var express = require('express');
var router = express.Router();

//controllers
const blogapicontroller = require('./controllers/blogapicontroller');

//routes
router.post('/createblog', blogapicontroller.createblog)
router.get('/getuserblogs/:name', blogapicontroller.getuserblogs)
router.get('/getallblogs', blogapicontroller.getallblogs)
router.get('/blogview/:slug', blogapicontroller.getblogview)
router.delete('/deleteblog/:id', blogapicontroller.deleteblog)
module.exports = router