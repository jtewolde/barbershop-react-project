function validateEmail(email) {
  const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  return re.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const re = /^\d{3}-\d{3}-\d{4}$/; // Regex for phone number format: XXX-XXX-XXXX
  return re.test(phoneNumber);
}

function validatePassword(password) {
  return password.length >= 6; 
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

  return errors; // Return the errors object
}

export default SignupValidation;
