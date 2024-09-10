// This page will display the available barbers for the customer to choose from.

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { query, collection } from "firebase/firestore";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { db } from "../../../firebase";
import { getDocs } from "firebase/firestore";
import { useEffect } from "react";
import CustomerNavbar from "../../CustomerNavbar";
import './dashboard.css';


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


export default function AvailableBarbers() {

    const [barbers, setBarbers] = useState([]);

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
                                <th>Book Appointment</th>
                                <th>Delete Appointment</th>
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
                                <td><button className= "book-btn">Book</button></td>
                                <td><button className= "delete-btn">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                ))}
        </div>

            <button onClick={signOutUser} className="signout-btn">Sign Out</button>

        </div>
    )

}
