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
const UserDetail = require('../../models/userDetail');
//Post request 

//UserDetail end point

router.route('/tasks').post((req, res) => {
    const newUserDetail = new UserDetail({
        email: req.body.email,
        tasks: req.body.tasks,
    });
    newUserDetail.save()
    .then(detail => res.json(detail))
    .catch(err => console.log(err));
});

//UserDetail Get end point

router.route('/tasks').get((req, res) => {
    UserDetail.find()
    .then(detail => res.json(detail))
    .catch(err => res.status(400).json('Error: ', err));
})

//Find UserDetail by id

router.route('/tasks/:id').get((req, res) => {
    UserDetail.findById(req.params.id)
    .then(detail => res.json(detail))
    .catch(err => res.status(400).json('Error: ', err));
})
//Update UserDetails by id
router.route('/tasks/:id').post((req, res) => {
    UserDetail.findById(req.params.id)
    .then(userdetail => {
        userdetail.email = req.body.email;
        userdetail.tasks = req.body.tasks;

        userdetail.save()
        .then(() => res.json('UserDetail Updated'))
        .catch(err => console.log(err));
    })
    .catch(err => res.status(400).json('Error: ', err));
})
//Push Tasks to UserDetails
router.route('/tasks/update/:id').post((req, res) => {
    UserDetail.findByIdAndUpdate(
        {_id: req.params.id},
        { $push: { tasks: req.body.tasks}}
    ).then(() => res.json('New Task Pushed'))
    .catch(err => console.log(err));
    
})
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

// Get list of users
router.route('/').get((req, res) =>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ', err));
});

module.exports = router;