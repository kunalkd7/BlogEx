const { validationResult } = require('express-validator');
const usermodel = require('../../models/usermodel')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()

exports.signup = function (req, res, next) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.cpassword;

    //express validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    } else {
        //bcrypt password
        const hash = bcrypt.hashSync(password, 10);
        const newuser = new usermodel({ username: name, useremail: email, userpassword: hash });

        newuser.save()
            .then(data => {
                res.status(200).json({
                    msg: "User Registered Successfully",
                })
            })
            .catch(err => { res.status(500).json({ err: err }) })  //mongo db schema validation error 
    }
}

exports.login = function (req, res, next) {
    const name = req.body.name;
    const password = req.body.password

    const errors = validationResult(req); //errors from middleware uservalidation.login

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    } else {
        usermodel.findOne({ username: name }).then(data => {
            if (data) { //checking array of object is empty or not
                console.log(data)
                const compare = bcrypt.compareSync(password, data.userpassword);

                if (compare) {
                    const token = jwt.sign({ username: name, id: data._id }, process.env.Secretkey, { expiresIn: "7d" });
                    res.status(200).json({
                        msg: "Logged in successfully",
                        token: token
                    })
                } else {
                    //sending error in arrayobject format cz of above errors.array() format
                    res.status(400).json({ errors: [{ msg: "wrong password" }] })
                }
            } else {
                res.status(400).json({ errors: [{ msg: "wrong username and password" }] })
            }
        }).catch(err => { res.status(500).json({err: err}) }) //works when there's error in res above
    }
}