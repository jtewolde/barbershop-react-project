import React, { useState } from "react";
import './LoginForm.css';
import validateLogin from "./LoginValidation";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth"; // Using signInWithEmailAndPassword for email/password sign-in
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import './privateTestForm'

export default function LoginForm({ user }) {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({}); // State variable to hold the errors

    const navigate = useNavigate(); // The navigate function is used to redirect the user to a different page

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateLogin(values));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const signIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log("User signed in successfully:", userCredential.user);

            // Redirect the user to the private page after successful sign-in
            navigate('/private');
            toast.success("User signed in successfully", { duration: 4000 });
        } catch (error) {
            console.log("Error signing in:", error.message);
            toast.error("Error signing in");
        }
    };

    // Clear the form inputs
    const clearInputs = () => {
        setValues({
            email: '',
            password: ''
        });
    };

    const handleLoginAndSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        signIn();           // Sign in the user
        handleSubmit(e);    // Validate the form
        clearInputs();      // Clear the form inputs
    };

    return (
        <div className="login-background">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleLoginAndSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" name="email" value={values.email} onChange={handleLoginChange} />
                        {/* {errors.email && <p className='error'>{errors.email}</p>} */}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={values.password} onChange={handleLoginChange} />
                        {/* {errors.password && <p className='error'>{errors.password}</p>} */}
                    </div>
                    <button type="submit">Login</button>
                </form>

                <h1>User Logged In</h1>
                {auth.currentUser ? auth.currentUser.email : "No user is currently logged in."}
            </div>
        </div>
    );
}
