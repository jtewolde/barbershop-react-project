// This JS snippet is the validation for the sign up form. \
// It checks if the user has entered the required information in the form fields. 
// If the user has not entered the required information, an error message will be displayed. 
// The validation checks for the following:
// - First Name is required
// - Last Name is required
// - Username is required
// - Email is required
// - Email is invalid
// - Phone Number is required
// - Phone Number is invalid
// - Password is required
// - Password must be at least 8 characters
// - Confirm Password is required
// - Passwords do not match


function validateEmail(email) {
  const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  return re.test(email); // Returns true if the email is valid
}

function validatePhoneNumber(phoneNumber) {
  const re = /^[0-9]{10}$/; // Phone number should be 10 digits
  return re.test(phoneNumber); // Returns true if the phone number is valid
}

function validatePassword(password) {
  return password.length >= 6; // Returns true if the password is at least 8 characters
}

function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}

function SignupValidation(values) {
  const errors = {};
  var trackErrors = false; // This variable is used to track if there are any errors in the form

  if (!values.firstName.trim()) {
    errors.firstName = 'First Name is required';
    trackErrors = true; 
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last Name is required';
    trackErrors = true; 
  }

  if (!values.username.trim()) {
    errors.username = 'Username is required';
    trackErrors = true;
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
    trackErrors = true;
  } else if (!validateEmail(values.email)) {
    errors.email = 'Email is invalid';
    trackErrors = true;
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone Number is required';
    trackErrors = true;
  } else if (!validatePhoneNumber(values.phoneNumber)) {
    errors.phoneNumber = 'Phone Number is invalid';
    trackErrors = true;
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required';
    trackErrors = true;
  } else if (!validatePassword(values.password)) {
    errors.password = 'Password must be at least 6 characters';
    trackErrors = true;
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = 'Confirm Password is required';
    trackErrors = true;
  } else if (!validateConfirmPassword(values.password, values.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
    trackErrors = true;
  }
  console.log("Track Errors: ", trackErrors); // This line is used to log the trackErrors variable
  return errors; // Returns the errors object
  
}

export default SignupValidation;