import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
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

    const [isOpen, setIsOpen] = React.useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="navbar">
            <img src ={timelyCutsLogo} alt="Timely Cuts Logo" className="navbar-logo" />

            <div className="menu" onClick={toggleNavbar}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            <ul className={isOpen ? "open" : ""}>
                <li><NavLink to="requested-appointments" className="navbar-link">Requested Appointments</NavLink></li>
                <li><NavLink to="scheduled-appointments" className="navbar-link">Scheduled Appointments</NavLink></li>
                <li><NavLink to="barber-calendar" className="navbar-link">Calendar</NavLink></li>
                {/* <li> {auth.currentUser.email}</li> */}
                <li><NavLink to ="/" className="navbar-link" onClick={signOutUser}>Sign Out</NavLink></li>
            </ul>
        </nav>
    )
}
