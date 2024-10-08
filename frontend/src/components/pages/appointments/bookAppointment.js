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
import { auth } from "../../../firebase";

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
    
    // Function to get the customer information from the database
    async function getCustomerInfo(email) {
        const customersRef = collection(db, "customers"); // Reference to the customers collection
        const q = query(customersRef); // Query to get the customers
        let customerInfo = {}; // Object to store the customer info

        const querySnapshot = await getDocs(q); // Get the documents from the query
        querySnapshot.forEach((doc) => { // Loop through the documents
            const customer = doc.data(); // Get the customer data
            if (customer.email.toLowerCase() === email.toLowerCase()) { // Check if the customer email matches
                customerInfo = { // Set the customer info object
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    phoneNumber: customer.phoneNumber
                };
            }
        });

        return customerInfo; // Return the customer info
    }


    const handleBookAppointment = async (e) => {
        e.preventDefault();
        const selectedBarber = barbers[document.getElementById("barber").selectedIndex];
    
        try {
            // Fetch the customer information asynchronously
            const customerInfo = await getCustomerInfo(auth.currentUser.email);
    
            if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.phoneNumber) {
                throw new Error("Customer information not found.");
            }
    
            const customerNameData = customerInfo.firstName + " " + customerInfo.lastName;
            const customerPhoneNumberData = customerInfo.phoneNumber;
    
            console.log("Customer Name: ", customerNameData);
            console.log("Customer Phone Number: ", customerPhoneNumberData);
    
            const appointment = {
                barberEmail: selectedBarber.email,
                barberName: selectedBarber.firstName + " " + selectedBarber.lastName,
                barberShopName: selectedBarber.barberShopName,
                barberShopAddress: selectedBarber.barberShopAddress,
                barberPhoneNumber: selectedBarber.phoneNumber,
                customer: auth.currentUser.email,
                customerName: customerNameData,
                customerPhoneNumber: customerPhoneNumberData,
                date: date,
                status: "Pending"
            };
    
            await addDoc(collection(db, "appointments"), appointment);
            console.log("Appointment booked successfully");
            toast.success("Appointment booked successfully");
    
            console.log("Appointment Data: ", appointment);
            navigate("/appointments");
        } catch (e) {
            console.error("Error adding document: ", e);
            toast.error("Error booking appointment");
        }
    };
     

    return(
        <div className="dashboard">
            <h1 className="book-appointment-header">Book Appointment</h1>
            <div className="barbers">
                <h2 className="select-barber-header">Select a Barber</h2>
                <select name="barber" id="barber" className="barber-select" placeHolder="Select a Barber">
                    {barbers.map((barber) => (
                        <option value={barber.username}>{barber.firstName} {barber.lastName}</option>
                    ))}
                </select>
            </div>
            <div className="appointment">
                <h2>Select a Date and Time</h2>
                
                <DatePicker 
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy h:mm aa"
                    minDate={new Date()}
                    showTimeSelect
                    timeFormat="h:mm aa"
                    timeIntervals={15}
                    timeCaption="Time"
                    className = "date-picker"
                    
                />
                
            </div>
            <button onClick={() => navigate("/available-barbers")} className="back-btn">Back</button>
            <button onClick={handleBookAppointment} className="book-appointment-btn">Book Appointment</button>
        </div>
    )

}