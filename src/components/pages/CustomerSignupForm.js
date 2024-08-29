import React from 'react';
import './SignupForm.css';

export default function CustomerSignupForm() {
    // This is the form for the customer sign up
    return (
        <div className="customer-signup-background">
            <div className="signup-form">
                <h1>Sign Up as a Customer!</h1>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Phone Number" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button>Sign Up</button>
            </div>
    </div>
    )
}