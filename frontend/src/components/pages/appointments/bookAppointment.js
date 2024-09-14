import React from "react";
import { query, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { addDoc } from "firebase/firestore";

import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import './dashboard.css';
import "react-datepicker/dist/react-datepicker.css";

// Function to book an appointment with a barber
export default function BookAppointment() {

    const navigate = useNavigate(); // This hook is used to navigate to a different page
    const [barbers, setBarbers] = useState([]); // This state is used to store the barbers
    const [date, setDate] = useState(new Date()); // This state is used to store the date of the appointment
    
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

    const handleBookAppointment = async (e) => {
        e.preventDefault();
        const appointment = {
            barberName: barbers[0].firstName + " " + barbers[0].lastName,
            barberUsername: barbers[0].username,
            barberEmail: barbers[0].email,
            barberPhoneNumber: barbers[0].phoneNumber,
            barberShopName: barbers[0].barberShopName,
            barberShopAddress: barbers[0].barberShopAddress,
            date: date,
            status: "Pending",
            customerName: "John Doe",
        };

        try {
            await addDoc(collection(db, "appointments"), appointment);
            console.log("Appointment booked successfully");
            toast.success("Appointment booked successfully");
        } catch (e) {
            console.error("Error adding document: ", e);
            toast.error("Error booking appointment");
        }
    }

    return(
        <div className="dashboard">
            <h1>Book Appointment</h1>
            <div className="barbers">
                <h2>Select a Barber</h2>
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
                        {barbers.map((barber) => (
                            <tr>
                                <td>{barber.firstName}</td>
                                <td>{barber.lastName}</td>
                                <td>{barber.username}</td>
                                <td>{barber.email}</td>
                                <td>{barber.phoneNumber}</td>
                                <td>{barber.barberShopName}</td>
                                <td>{barber.barberShopAddress}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="appointment">
                <h2>Choose a barber and select a date and time for your appointment</h2>
                
                <DatePicker 
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy h:mm aa"
                    minDate={new Date()}
                    showTimeSelect
                    timeFormat="h:mm aa"
                    timeIntervals={15}
                    timeCaption="Time"
                    is24Hour={false}
                />
                
            </div>
            <button onClick={() => navigate("/available-barbers")}>Back</button>
            <button onClick={handleBookAppointment}>Book Appointment</button>
        </div>
    )

}