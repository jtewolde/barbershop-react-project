import React, { useEffect, useState } from "react";
import { query, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import './dashboard.css';

export default function BarberAppointmentList() {
    const [appointments, setAppointments] = useState([]);

    // Function to get the appointments from the database for the specific logged-in barber
    function displayRequestedAppointments() {
        const appointmentsRef = collection(db, "appointments"); // Reference to the appointments collection
        const q = query(appointmentsRef); // Query to get the appointments
        const appointmentsArray = []; // Array to store the appointments

        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((document) => { // Loop through the documents
                const appointmentData = document.data();
                const barberEmail = appointmentData.barberEmail.toLowerCase();
                const currentUserEmail = getAuth().currentUser.email.toLowerCase();

                console.log("Barber Email: ", barberEmail);
                console.log("Current User Email: ", currentUserEmail);

                if (barberEmail === currentUserEmail) {
                    appointmentsArray.push({ id: document.id, ...appointmentData }); // Add appointment with ID
                    console.log("Appointment Data: ", appointmentData);
                }
            });
            setAppointments(appointmentsArray);
        }).catch((error) => {
            console.error("Error fetching appointments:", error);
        });
    }

    useEffect(() => {
        displayRequestedAppointments(); // Call the function to get the appointments
    }, []);

    // Update appointment status
    const updateStatus = async (id, status) => {
        try {
            const appointmentRef = doc(db, "appointments", id);
            await updateDoc(appointmentRef, { status });
            toast.success("Appointment status updated successfully", { duration: 4000 });
            displayRequestedAppointments(); // Refresh the appointments after updating
        } catch (error) {
            console.error("Error updating appointment:", error);
        }
    };

    // Delete appointment
    const deleteAppointment = async (id) => {
        try {
            const appointmentRef = doc(db, "appointments", id);
            await deleteDoc(appointmentRef);
            toast.success("Appointment deleted successfully", { duration: 4000 });
            displayRequestedAppointments(); // Refresh the appointments after deletion
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    return (
        <div className="dashboard">
            <h1>Requested Appointments from Customers</h1>
            <div className="appointments">
                <table className="barberTable">
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
                            <th>Confirm Appointment</th>
                            <th>Cancel Appointment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment.id}> {/* Key added */}
                                    <td>{appointment.barber}</td>
                                    <td>{appointment.barberEmail}</td>
                                    <td>{appointment.barberShopName}</td>
                                    <td>{appointment.barberShopAddress}</td>
                                    <td>{appointment.barberPhoneNumber}</td>
                                    <td>{appointment.customer}</td>
                                    <td>{appointment.date ? appointment.date.toDate().toString() : ""}</td>
                                    <td>{appointment.status}</td>
                                    <td>
                                        <button onClick={() => updateStatus(appointment.id, "Confirmed")} className="book-btn">
                                            Confirm
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteAppointment(appointment.id)} className="delete-btn">
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10">No appointments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
