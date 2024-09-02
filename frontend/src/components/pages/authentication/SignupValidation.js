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

  if (!values.firstName.trim()) {
    errors.firstName = 'First Name is required';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last Name is required';
  }

  if (!values.username.trim()) {
    errors.username = 'Username is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone Number is required';
  } else if (!validatePhoneNumber(values.phoneNumber)) {
    errors.phoneNumber = 'Phone Number is invalid';
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required';
  } else if (!validatePassword(values.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (!validateConfirmPassword(values.password, values.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

export default SignupValidation;