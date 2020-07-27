const Validator = require('validator');
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let error = {};
    
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Name checks
    if(Validator.isEmpty(data.name)){
        error.name = "Name field is required";
    }

    //Email checks
    if(Validator.isEmpty(data.email)){
        error.email = "Email field is required";
    }
    else if(!Validator.isEmail(data.email)){
        error.email = "Email is invalid";
    }

    //Password checks
    if(Validator.isEmpty(data.password)){
        error.password = "Password field is require";
    }
    if(Validator.isEmpty(data.password2)){
        error.password2 = "Confirm password field is required";
    }
    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        error.password = "Password must be atleast 6 character long";
    }
    if(!Validator.equals(data.password, data.password2)){
        error.password2 = "Passwords much match";
    }

    return {
        error,
        isValid: isEmpty(error),
    }
}
