import toast from 'react-hot-toast'; // Import toast from react-hot-toast

export default function validateLogin(values) {
    // This function is used to validate the login form
    const errors = {};
    
    function validatePassword(password) {
        return password.length >= 6; // Returns true if the password is at least 8 characters
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        return re.test(email); // Returns true if the email is valid
    }

    // Email Errors
    if (!values.email || !values.email.trim()) {
        errors.email = 'Email is required';
        toast.error("Email is required");
    }
    else if (!validateEmail(values.email)) {
        errors.email = 'Email is invalid';
        toast.error("Email is invalid");
    }

    // Password Errors
    if (!values.password || !values.password.trim()) {
        errors.password = 'Password is required';
        toast.error("Password is required");
    }
    else if (!validatePassword(values.password)) {
        errors.password = 'Password must be at least 6 characters';
        toast.error("Password must be at least 6 characters");
    }

    return errors;
}
