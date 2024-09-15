// This page will display the available barbers for the customer to choose from.

import React, { useState } from "react";
import { query, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import './dashboard.css';


export default function AvailableBarbers() {

    const [barbers, setBarbers] = useState([]);
    const navigate = useNavigate();

    // Function to get the available barbers
    function displayBarbers() {
        const barbersRef = collection(db, "barbers"); // Reference to the barbers collection
        const q = query(barbersRef);  // Query to get the barbers
        const barbersArray = [];  // Array to store the barbers
        getDocs(q).then((querySnapshot) => {  // Get the documents from the query
            querySnapshot.forEach((doc) => { // Loop through the documents
                barbersArray.push(doc.data()); // Add the barber to the array
                console.log(doc.data()); // Log the barber data
            });
            setBarbers(barbersArray); // Set the barbers state to the array
        });
    }

    useEffect(() => {
        displayBarbers();  // Call the function to get the barbers
    }
    , []);

    const handleBookAppointment = () => {
        // Redirect to the book appointment page
        navigate("/book-appointment");
    }

    return (
        <div className="dashboard">
            <h1>Avaliable Barbers</h1>
            <div className="barbers">
                {barbers.map((barber) => (
                    <table className = "barberTable">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Barber Shop Name </th>
                                <th>Barber Shop Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{barber.firstName}</td>
                                <td>{barber.lastName}</td>
                                <td>{barber.username}</td>
                                <td>{barber.email}</td>
                                <td>{barber.phoneNumber}</td>
                                <td>{barber.barberShopName}</td>
                                <td>{barber.barberShopAddress}</td>
                            </tr>
                        </tbody>
                    </table>
                ))}

                <button onClick={handleBookAppointment} className="book-appointment-btn">Book Appointment</button>
        </div>

        </div>
    )

}
