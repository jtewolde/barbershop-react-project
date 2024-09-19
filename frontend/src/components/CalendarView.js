import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

import "react-big-calendar/lib/css/react-big-calendar.css"; // Styling for the calendar

const localizer = momentLocalizer(moment); // Localizer for the calendar

// Function to display the calendar view
const CalendarView = () => {
    const [appointments, setAppointments] = useState([]); // State to store the appointments
    const auth = getAuth(); // Get the auth object

    // Function to get the appointments from the database for the current barber or customer
    const getAppointments = async() => {
        const appointmentsRef = collection(db, "appointments"); // Reference to the appointments collection
        const q = query(appointmentsRef); // Query to get the appointments
        const querySnapshot = await getDocs(q); // Get the documents from the query
        const appointmentsArray = []; // Array to store the appointments

        querySnapshot.forEach((doc) => { // Loop through the documents
            const appointment = doc.data(); // Get the appointment data
            const currentUserEmail = auth.currentUser.email.toLowerCase(); // Get the current user's email in lowercase

            console.log("Barber Email: ", appointment.barberEmail); // Log the barber's email

            console.log("Current User Email: ", currentUserEmail); // Log the current user's email

            // Check if the appointment is for the current user
            if ((appointment.customer.toLowerCase() === currentUserEmail || appointment.barberEmail.toLowerCase() === currentUserEmail) &&
                (appointment.status === "Confirmed")) {

                console.log("Appointment: ", appointment); // Log the appointment
                appointmentsArray.push({
                    id: doc.id,
                    title: 'Appointment For ' + appointment.customer, // Title of the appointment
                    start: appointment.date.toDate(), // Start date of the appointment
                    end: moment(appointment.date.toDate()).add(1, 'hour').toDate(), // End date of the appointment
                    allDay: false // Set allDay to false
                });

                console.log("Appointments Array: ", appointmentsArray); // Log the appointments array
            

            }
        }
        );

        setAppointments(appointmentsArray); // Set the appointments state to the array
    }

    useEffect(() => {
        getAppointments(); // Call the function to get the appointments
    }

    , []);

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={appointments}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}

export default CalendarView;
    


