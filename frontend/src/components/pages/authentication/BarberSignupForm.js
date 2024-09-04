import React, { useState } from 'react';
import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignupForm.css';
import SignupValidation from './SignupValidation';
import { useNavigate } from 'react-router-dom';

export default function BarberSignupForm({user}) {
    // This is the form for the barber sign up

    // The following are the states for the barber sign up form
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        barberShopName: '',
        barberShopAddress: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({}); // The errors state is used to store the errors returned by the validation function

    const navigate = useNavigate();

    // This function handles the submission of the barber sign up form
    function handleSubmit(e) {
        e.preventDefault();
        setErrors(SignupValidation(values)); // The errors state is set to the errors returned by the validation function
    }

    // This function handles the change in the input fields of the barber sign up form
    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    // This function is used to clear the input fields of the barber sign up form when the form is submitted successfully
    const clearInputs = () => {
        setValues({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phoneNumber: '',
            barberShopName: '',
            barberShopAddress: '',
            password: '',
            confirmPassword: ''
        });
    }

    // This function is used to create a new user with the email and password provided
    const signUp = async () => {
        try{
            if(Object.keys(errors).length === 0 && errors.constructor === Object){ // If there are no errors in the form
                const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
                const user = userCredential.user;
                console.log(user);
                console.log("User signed up successfully");
                navigate('/private');
            } else {
                console.log("User not signed up");
                console.log(errors);
            }
        }
        catch (error) {
            console.log(error.message);
    }
}
    // This function is used to handle the sign up and submission of the barber sign up form 
    // It calls the signUp function and the handleSubmit function for the submit button to work
    const handleSignupAndSubmit = (e) => {
        signUp();
        handleSubmit(e);
        clearInputs();
        signUpMessage();
    }

    // This function is used to display a message if the user has signed up successfully
    const signUpMessage = () => {
        if(Object.keys(errors).length === 0 && errors.constructor === Object){
            return <p className="success">You have signed up successfully!</p>
        }
    }
    
    return (
        <div className="barber-signup-background">
            <div className="signup-form">
                <h1>Sign Up as a Barber!</h1>
    
                <form onSubmit={signUp}>

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

                <input type="text" name="barberShopName" placeholder="Barber Shop Name" value={values.barberShopName} onChange={handleChange} />

                <input type="text" name="barberShopAddress" placeholder="Barber Shop Address" value={values.barberShopAddress} onChange={handleChange} />
                
                <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
                {errors.password && <p className="error">{errors.password}</p>}

                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={values.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <button type="submit" onClick={handleSignupAndSubmit}>Sign Up</button>

                </form>
        </div>
    </div>
    )
}