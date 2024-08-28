import React from "react";
import './LoginForm.css';

export default function LoginForm() {
    return (
        <div className="login-form">
            <h1>Login</h1>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Log in</button>
        </div>
    )


}