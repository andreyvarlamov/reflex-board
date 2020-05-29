const Validator = require("validator");
const isEmpty = require("is-empty");

function validateLoginInput(data) {
  let msg = "";
  let emailValid = true;

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

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

module.exports = validateLoginInput;
