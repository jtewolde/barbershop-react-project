import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import timelyCutsLogo from "../components/pages/images/TimelyCuts2.png";

export default function CustomerNavbar() {
    return (
        <nav className="navbar-customer">
            <img src ={timelyCutsLogo} alt="Timely Cuts Logo" className="navbar-logo" />
            <ul>
                <li><Link to="dashboard" className="navbar-link">Dashboard</Link></li>
                <li><Link to="appointments" className="navbar-link">Appointments</Link></li>
                <li><Link to="profile" className="navbar-link">Profile</Link></li>
                <li><Link to="logout" className="navbar-link">Logout</Link></li>
            </ul>
        </nav>
    )
}
