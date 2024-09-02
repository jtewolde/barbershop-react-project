import React, {useState} from "react";
import './LoginForm.css';
import validateLogin from "./LoginValidation";
import { auth } from "../../../firebase";
import { signInWithCredential } from "firebase/auth";
import Test from "../test";


export default function LoginForm() {

    // These are the states for the username and password for the login form
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({}); // The errors state is used to store the errors returned by the validation function

    // This function handles the submission of the login form
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateLogin(values)); // The validation function is called and the returned errors are stored in the errors state
    }

    // This function handles the change in the input fields of the login form
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    // This function is used to sign in the user with the email and password provided
    const signIn = async () => {
        try {
            const userCredential = await signInWithCredential(auth, values.email, values.password);
            const user = userCredential.user;
            console.log(user);
            console.log("User signed in successfully");
        }
        catch (error) {
            console.log(error.message);
        }
    }


    // This function is used to handle the sign in and submission of the login form
    // It calls the signIn function and the handleSubmit function for the submit button to work
    const handleLoginAndSubmit = (e) => {
        signIn();
        handleSubmit(e);
        Test();
    }

    return (
        <div className="login-background">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" name="email" value={values.email} onChange={handleLoginChange} />
                        {errors.email && <p className='error'>{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={values.password} onChange={handleLoginChange} />
                        {errors.password && <p className='error'>{errors.password}</p>}
                    </div>
                    <button type="submit" onClick={handleLoginAndSubmit}>Login</button>
                </form>
            </div>
        </div>
    )
}