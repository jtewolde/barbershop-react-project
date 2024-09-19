import React, { useEffect, useState } from "react";
import { query, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import toast from "react-hot-toast";
import './dashboard.css';

export default function ScheduledAppointments() {
    const [appointments, setAppointments] = useState([]);

    // Function to fetch appointments for the logged-in customer
    function displayAppointments() {
        const appointmentsRef = collection(db, "appointments");

        // Fetch appointments where the barber email is the same as the logged-in user's email
        const q = query(appointmentsRef);
        const appointmentsArray = [];

        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((document) => {
                // Include the document ID in the appointment data
                const appointmentData = document.data();
                console.log("Appointment Data: ", appointmentData);
                appointmentsArray.push({ id: document.id, ...appointmentData }); // Add appointment with ID
        });

        setAppointments(appointmentsArray);
        console.log("Appointments: ", appointmentsArray);

        });


    }

    useEffect(() => {
        displayAppointments();
    }, []);

    // Function to only display the appointments that are scheduled or their status is confirmed
    const displayScheduledAppointments = () => {
        return appointments.filter((appointment) => appointment.status === "Scheduled" || appointment.status === "Confirmed");
    };

    // Function to delete an appointment by its ID
    const deleteAppointment = async (id) => {
        const appointmentRef = doc(db, "appointments", id);
        await deleteDoc(appointmentRef);
        displayAppointments(); // Refresh the list after deletion
        toast.success("Appointment deleted successfully", { duration: 4000 });
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return ""; // Return empty string if no timestamp

        const date = timestamp.toDate(); // Convert timestamp to date
        return date.toLocaleDateString("en-US", {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    return (
        <div className="dashboard">
            <h1> Scheduled Appointments</h1>
            <div className="appointments">
                {displayScheduledAppointments().map((appointment) => (
                    <table key={appointment.id} className="barberTable">
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
                                <th>Delete Appointment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{appointment.barberName}</td>
                                <td>{appointment.barberEmail}</td>
                                <td>{appointment.barberShopName}</td>
                                <td>{appointment.barberShopAddress}</td>
                                <td>{appointment.barberPhoneNumber}</td>
                                <td>{appointment.customer}</td>
                                <td>{formatDate(appointment.date)}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button onClick={() => deleteAppointment(appointment.id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    );
}