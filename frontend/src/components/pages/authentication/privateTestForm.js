
import React from "react";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import './private.css';

// This function is used to sign out the user
const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
    }
    catch (error) {
        console.log(error.message);
    }
}

export default function PrivateTestForm() {
    
    return (
        <div className="private">
            <h1>Test for Sign Out/Private Page</h1>
            <p>This is a private page</p>
            <button onClick={signOutUser}>Sign Out</button>
            <p> Welcome! {auth.currentUser.email}</p>
        </div>
    )
}


