const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.role = !isEmpty(data.role) ? data.role : "";

    if (validator.isEmpty(data.name)) {
        errors.name = "Name is required"
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required"
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm your password"
    }

    if (validator.isEmpty(data.role)) {
        errors.role = "Student or Tutor option required"
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};