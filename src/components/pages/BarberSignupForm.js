import React from 'react';
import './SignupForm.css';

export default function BarberSignupForm() {
    // This is the form for the barber sign up
    return (
        <div className="barber-signup-background">
            <div className="signup-form">
                
                <h1>Sign Up as a Barber!</h1>
                <input type="text" className="input" placeholder="First Name" />
                <input type="text" className="input" placeholder="Last Name" />
                <input type="text" className="input" placeholder="Username" />
                <input type="email" className="input" placeholder="Email" />
                <input type="tel" className="input" placeholder="Phone Number" />
                <input type="text" className="input" placeholder="Barber Shop Name" />
                <input type="text" className="input" placeholder="Barber Shop Address" />
                <input type="password" className="input" placeholder="Password" />
                <input type="password" className="input" placeholder="Confirm Password" />
                <button>Sign Up</button>
            </div>
        </div>
    )
}

