import React, { useState } from 'react';
import './SignupForm.css';
import SignupValidation from './SignupValidation';

export default function CustomerSignupForm() {
    // This is the form for the customer sign up

    // The following are the states for the customer sign up form
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({}); // The errors state is used to store the errors returned by the validation function

    // This function handles the submission of the customer sign up form
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(SignupValidation(values)); // The validation function is called and the returned errors are stored in the errors state
        
    }

    // This function handles the change in the input fields of the customer sign up form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    return (
        <div className="customer-signup-background">
            <div className="signup-form">
                <h1>Sign Up as a Customer!</h1>
                <input type="text" name="firstName" placeholder="First Name" value={values.firstName} onChange={handleChange} />
                {errors.firstName && <p className="error">{errors.firstName}</p>}

                <input type="text" name="lastName" placeholder="Last Name" value={values.lastName} onChange={handleChange} />
                {errors.lastName && <p className="error">{errors.lastName}</p>}

                <input type="text" name="username" placeholder="Username" value={values.username} onChange={handleChange} />
                {errors.username && <p className="error">{errors.username}</p>}

                <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}

                <input type="tel" name="phoneNumber" placeholder="Phone Number" value={values.phoneNumber} onChange={handleChange} />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

                <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
                {errors.password && <p className="error">{errors.password}</p>}

                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={values.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <button onClick={handleSubmit}>Sign Up</button>
            </div>
    </div>
    )
}