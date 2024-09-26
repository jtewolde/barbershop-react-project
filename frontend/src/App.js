import './App.css';

import React, { useEffect, useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase'; // Import Firestore db
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // For fetching user data

import Navbar from './components/Navbar';
import CustomerNavbar from './components/CustomerNavbar';
import BarberNavbar from './components/BarberNavbar';

import BarberSignupForm from './components/pages/authentication/BarberSignupForm';
import CustomerSignupForm from './components/pages/authentication/CustomerSignupForm';
import LoginForm from './components/pages/authentication/LoginForm';
import Home from './components/pages/Home';
import PrivateTestForm from './components/pages/authentication/privateTestForm';
import AvailableBarbers from './components/pages/appointments/AvailableBarbers';
import BookAppointment from './components/pages/appointments/bookAppointment';
import AppointmentList from './components/pages/appointments/CustomerAppointmentList';
import BarberAppointmentList from './components/pages/appointments/BarberAppointmentList';
import ScheduledAppointments from './components/pages/appointments/ScheduledAppointments';

import BarberCalendar from './components/pages/appointments/calendars/BarberCalendar';
import CustomerCalendar from './components/pages/appointments/calendars/CustomerCalendar';

import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null); // Stores the user info
  const [loading, setLoading] = useState(true); // Loading state
  const [userRole, setUserRole] = useState(null); // To store user role (barber/customer)

  // This section of the App component checks if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user); // Set the user info
        setLoading(false); // Stop loading

        // Fetch user role (customer or barber) from Firestore
        try {
          const barberDoc = await getDoc(doc(db, "barbers", user.uid));
          const customerDoc = await getDoc(doc(db, "customers", user.uid));

          if (barberDoc.exists()) {
            setUserRole('barber'); // User is a barber
          } else if (customerDoc.exists()) {
            setUserRole('customer'); // User is a customer
          } else {
            setUserRole(null); // User is neither barber nor customer
          }
        } catch (error) {
          console.log("Error fetching user role:", error);
          setUserRole(null); // Error case
        }

      } else {
        setUser(null); // No user is logged in
        setUserRole(null); // No role since no user
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>

      <div className="App">
        {/* Conditionally render the appropriate navbar based on user role */}
        {!user ? (
          <Navbar />
        ) : userRole === 'customer' ? (
          <CustomerNavbar />
        ) : userRole === 'barber' ? (
          <BarberNavbar />
        ) : (
          <Navbar />
        )}

        <Toaster />
        

        {/* Routes for the app */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/barber-signup" element={<BarberSignupForm />} />
          <Route path="/customer-signup" element={<CustomerSignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/private" element={<ProtectedRoute user={user}><PrivateTestForm /></ProtectedRoute>} />
          <Route path="/available-barbers" element={<ProtectedRoute user={user}><AvailableBarbers /></ProtectedRoute>} />
          <Route path="/book-appointment" element={<ProtectedRoute user={user}><BookAppointment /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute user={user}><AppointmentList /></ProtectedRoute>} />
          <Route path="/requested-appointments" element={<ProtectedRoute user={user}><BarberAppointmentList /></ProtectedRoute>} />
          <Route path="/scheduled-appointments" element={<ProtectedRoute user={user}><ScheduledAppointments /></ProtectedRoute>} />
          <Route path="/barber-calendar" element={<ProtectedRoute user={user}><BarberCalendar /></ProtectedRoute>} />
          <Route path="/customer-calendar" element={<ProtectedRoute user={user}><CustomerCalendar /></ProtectedRoute>} />

        </Routes>

        {/* Footer */}

        <footer className="footer"> Logged In as {user ? user.email : "Guest"} <br />
          @2024 Timely Cuts. All Rights Reserved.
        </footer>

      </div>

    </main>
  );
}

export default App;
