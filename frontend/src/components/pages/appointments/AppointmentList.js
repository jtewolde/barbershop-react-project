import React from "react";
import { query, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import './dashboard.css';

export default function AppointmentList() {
    
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    // Function to get the appointments from the database and display them for the specific customer logged in
    function displayAppointments() {
        const appointmentsRef = collection(db, "appointments"); // Reference to the appointments collection
        const q = query(appointmentsRef); // Query to get the appointments
        const appointmentsArray = []; // Array to store the appointments
        getDocs(q).then((querySnapshot) => { // Get the documents from the query
            querySnapshot.forEach((doc) => { // Loop through the documents
                if(doc.data().customer === getAuth().currentUser.email) { // Check if the appointment is for the logged in customer
                    appointmentsArray.push(doc.data()); // Add the appointment to the array
                    console.log(doc.data()); // Log the appointment data
                }
            });
            setAppointments(appointmentsArray); // Set the appointments state to the array
        }
        );
    }

    useEffect(() => {
        displayAppointments();
    }
    , []);

    return (
        <div className="dashboard">
            <h1>Appointments</h1>
            <div className="appointments">
                {appointments.map((appointment) => (
                    <table className = "barberTable">
                        <thead>
                            <tr>
                                <th>Barber</th>
                                <th>Barber Email</th>
                                <th>Barber Shop Name</th>
                                <th>Barber Shop Address</th>
                                <th>Barber Phone Number</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{appointment.barber}</td>
                                <td>{appointment.barberEmail}</td>
                                <td>{appointment.barberShopName}</td>
                                <td>{appointment.barberShopAddress}</td>
                                <td>{appointment.barberPhoneNumber}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date ? appointment.date.toDate().toString() : ""}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    );
}