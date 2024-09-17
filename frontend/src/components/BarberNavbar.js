import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import timelyCutsLogo from "../components/pages/images/TimelyCuts2.png";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';



// Function to sign out the user
const signOutUser = async () => {
    try {
        await signOut(auth);
        toast.success("You have signed out successfully", { duration: 4000 });
    }
    catch (error) {
        console.log(error.message);
        toast.error("An error occurred while signing out");
    }
}


export default function BarberNavbar() {
    return (
        <nav className="navbar">
            <img src ={timelyCutsLogo} alt="Timely Cuts Logo" className="navbar-logo" />
            <ul>
                <li><Link to="requested-appointments" className="navbar-link">Requested Appointments</Link></li>
                <li><Link to="scheduled-appointments" className="navbar-link">Scheduled Appointments</Link></li>
                <li> {auth.currentUser.email}</li>
                <li><Link to ="/" className="navbar-link" onClick={signOutUser}>Sign Out</Link></li>
            </ul>
        </nav>
    )
}
