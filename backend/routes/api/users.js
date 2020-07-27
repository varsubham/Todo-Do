const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
//make sure to add keys

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//load user model
const User = require('../../models/user');

//Post request 

//Register end point
router.route('/register').post((req, res) => {
    // Form validation

    const { error, isValid } = validateRegisterInput(req.body);

    //Check validation
    if(!isValid){
        return res.status(400).json(error);
    }
    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(400).json({email: "Email already exist"})
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            //Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            })

        }
    })
})

//Login EndPoint

router.route('/login').post((req, res) => {
    //Form Validation
    const { error, isValid } = validateLoginInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(error);
    }
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email

    User.findOne({email})
    .then(user => {
        //Check if user exists
        if(!user){
            return res.status(404).json({emailnotfound: "Email not found"});
        }
        //Check password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch){
                //user matched
                // create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                //Sign token
                jwt.sign(payload, 
                    keys.secretOrKey, 
                    {
                        expiresIn: 31556926 //1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                    )
            }
            else{
                return res.status(400).json({passwordincorrect: "Password incorrect"});
            }
        })
    })
})
module.exports = router;