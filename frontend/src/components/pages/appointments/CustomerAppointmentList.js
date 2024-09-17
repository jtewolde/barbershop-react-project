import React, { useEffect, useState } from "react";
import { query, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import './dashboard.css';

export default function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    // Function to fetch appointments for the logged-in customer
    function displayAppointments() {
        const appointmentsRef = collection(db, "appointments");
        const q = query(appointmentsRef);
        const appointmentsArray = [];

        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((document) => {
                // Include the document ID in the appointment data
                const appointmentData = document.data();
                if (appointmentData.customer === getAuth().currentUser.email) {
                    appointmentsArray.push({ id: document.id, ...appointmentData }); // Add appointment with ID
                }
            });
            setAppointments(appointmentsArray);
        });
    }

    useEffect(() => {
        displayAppointments();
    }, []);

    // Function to delete an appointment by its ID
    const deleteAppointment = async (id) => {
        const appointmentRef = doc(db, "appointments", id);
        await deleteDoc(appointmentRef);
        displayAppointments(); // Refresh the list after deletion
        toast.success("Appointment deleted successfully", { duration: 4000 });
    };

    return (
        <div className="dashboard">
            <h1>Appointments</h1>
            <div className="appointments">
                {appointments.map((appointment) => (
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
                                <td>{appointment.barber}</td>
                                <td>{appointment.barberEmail}</td>
                                <td>{appointment.barberShopName}</td>
                                <td>{appointment.barberShopAddress}</td>
                                <td>{appointment.barberPhoneNumber}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date ? appointment.date.toDate().toString() : ""}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button
                                        onClick={() => deleteAppointment(appointment.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    );
}
