const Validator = require("validator");
const isEmpty = require("is-empty");

function validateRegisterInput(data) {
  let msg = "";
  let emailValid = true;

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.firstName)) {
    msg = "First name field is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    msg = "Last name field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    msg = "Passwords must match";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    msg = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    msg = "Password field is required";
  }

  if (Validator.isEmpty(data.email)) {
    msg = "Email field is required";
    emailValid = false;
  } else if (!Validator.isEmail(data.email)) {
    msg = "Email is invalid";
    emailValid = false;
  }

  return {
    msg,
    isValid: isEmpty(msg),
    emailValid,
  };
}

module.exports = validateRegisterInput;
