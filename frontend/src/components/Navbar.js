import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import timelyCutsLogo from "../components/pages/images/TimelyCuts2.png";

export default function Navbar() {
 
    // State to keep track of the navbar
    const [isOpen, setIsOpen] = React.useState(false);

    // Function to toggle the navbar
    const toggleNavbar = () => {
        setIsOpen(!isOpen); // Toggles the isOpen state
    }

    return (
        <nav className="navbar">
            <img src ={timelyCutsLogo} alt="Timely Cuts Logo" className="navbar-logo" />

            {/* Hamburger menu */}
            <div className="menu" onClick={toggleNavbar}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
                
                {/* Navbar links */}
            <ul className={isOpen ? "open" : ""}>
                <li><NavLink to="/" className="navbar-link">Home</NavLink></li>
                <li><NavLink to="barber-signup" className="navbar-link">Barber Sign Up</NavLink></li>
                <li><NavLink to="customer-signup" className="navbar-link">Customer Sign Up</NavLink></li>
                <li><NavLink to="login" className="navbar-link">Login</NavLink></li>
            </ul>
        </nav>
    )
}

