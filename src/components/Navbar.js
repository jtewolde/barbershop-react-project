import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import timelyCutsLogo from '../images/TimelyCuts2.png';

function Navbar() {
    return (
        <nav className="navbar">
            <img src ={timelyCutsLogo} alt="Timely Cuts Logo" className="navbar-logo" />
            <ul>
                <li><Link to="/" className="navbar-link">Home</Link></li>
                <li><Link to="barber-signup" className="navbar-link">Barber Sign Up</Link></li>
                <li><Link to="customer-signup" className="navbar-link">Customer Sign Up</Link></li>
                <li><Link to="login" className="navbar-link">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;