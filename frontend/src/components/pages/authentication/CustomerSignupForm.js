import React, { useState } from 'react';
import './SignupForm.css';
import SignupValidation from './SignupValidation';
import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';


export default function CustomerSignupForm({ user }) {
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

    const navigate = useNavigate();

    // This function handles the change in the input fields of the customer sign up form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    // This function handles the sign up and submission of the customer sign up form
    // It calls the signUp function and the handleSubmit function for the submit button to work
    const handleSignupAndSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = SignupValidation(values); // The validation function is called and the returned errors are stored in the errors state
        setErrors(validationErrors); // Errors are updated in the state

        // If there are no validation errors, the user is signed up
        if (Object.keys(validationErrors).length === 0) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password); // Create user with Firebase auth
                const user = userCredential.user; // Get the user object

                // If the user is signed up successfully, the user information is stored in the database
                if (user) {
                    const userRef = doc(db, "customers", user.uid);
                    await setDoc(userRef, {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        username: values.username,
                        email: values.email,
                        phoneNumber: values.phoneNumber
                    });

                    toast.success("Welcome! You have signed up successfully!", { duration: 4000 }); // Show success message
                    navigate('/private'); // Redirect to private page
                }
            } catch (error) {
                toast.error("An error occurred during sign-up. Please try again."); // Show error message for exceptions
                console.log(error.message);
            }
        } else {
            // If there are errors, the user is not signed up and toasts are shown for each error
            Object.values(validationErrors).forEach(error => {
                toast.error(error); // Show error message for each validation error
            });
        }
    };

    return (
        <div className="customer-signup-background">
            <div className="signup-form">
                <h1>Sign Up as a Customer!</h1>
                <input type="text" name="firstName" placeholder="First Name" value={values.firstName} onChange={handleChange} />
                {/* {errors.firstName && <p className="error">{errors.firstName}</p>} */}

                <input type="text" name="lastName" placeholder="Last Name" value={values.lastName} onChange={handleChange} />
                {/* {errors.lastName && <p className="error">{errors.lastName}</p>} */}

                <input type="text" name="username" placeholder="Username" value={values.username} onChange={handleChange} />
                {/* {errors.username && <p className="error">{errors.username}</p>} */}

                <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
                {/* {errors.email && <p className="error">{errors.email}</p>} */}

                <input type="tel" name="phoneNumber" placeholder="Phone Number" value={values.phoneNumber} onChange={handleChange} />
                {/* {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>} */}

                <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
                {/* {errors.password && <p className="error">{errors.password}</p>} */}

                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={values.confirmPassword} onChange={handleChange} />
                {/* {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>} */}

                <button onClick={handleSignupAndSubmit}>Sign Up</button>
            </div>
        </div>
    )
}
