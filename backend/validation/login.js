const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data){
    let error = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Email Validation
    if(Validator.isEmpty(data.email)){
        error.email = "Email field required";
    }
    else if(!Validator.isEmail(data.email)){
        error.email = "Invalid email";
    }
    //Password Validation
    if(Validator.isEmpty(data.password)){
        error.password = "Password field required";
    }

    return {
        error,
        isValid: isEmpty(error),
    }
}

