const { check } = require('express-validator');
const usermodel = require('../../models/usermodel');

//express validator
//trim should be placed first
exports.signupvalidation = [
    check('name', "Name is Required").trim().isLength({ min: 1 }),
    check('name').custom(name => {
        return usermodel.findOne({ username: name }).then(data => {
            if (data) {
                return Promise.reject('Username already in use');
            }
        })
    }),
    check('email', "Not a valid email address").isEmail(),
    check('email').custom(email => {
        return usermodel.findOne({ useremail: email }).then(data => {
            if (data) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    check('password', " Password should be 6 characters long").trim().isLength({ min: 6 }),
    // check('cpassword', "must be 6 characters").trim().isLength({ min: 6 }),
    check('cpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('password not matched');
        } else {
            return true
        }
    })
];


//login validaion
exports.login = [
    check('name', "Username is required").trim().isLength({min:1}),
    check('password', "password is required").trim().isLength({min:1})
]


//we can use try catch too
//  exports.checkusername = function (req, res, next) {
//     const name = req.body.name;
//     usermodel.findOne({ username: name }).then((data) => {
//         if (data) {
//             console.log(data)
//             res.status(400).json({ msg: "username is already taken" })
           
//         } else {
//             next();
//         }
//     }).catch(err => { res.json({ err: "server error" }) }) //it will work if there is error in sending response
// }


// exports.checkemail = function (req, res, next) {
//     const email = req.body.email;
//     usermodel.findOne({ useremail: email }).then((data) => {
//         if (data) {
//             res.status(400).json({ msg: "email is already taken" })
//         } else {
//             next();
//         }
//     }).catch(err => { res.json({ err: err }) })
// }

