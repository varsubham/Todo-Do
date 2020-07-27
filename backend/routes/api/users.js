const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
//make sure to add keys

//Load input validation
import validateRegisterInput from "../../validation/register";
import validateLoginInput from "../../validation/login";

//load user model
const User = require('../../models/user');

//Post request 
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