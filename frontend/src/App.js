
import './App.css';

import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

import Navbar  from './components/Navbar';
import CustomerNavbar from './components/CustomerNavbar';
import  BarberSignupForm from './components/pages/authentication/BarberSignupForm';
import  CustomerSignupForm  from './components/pages/authentication/CustomerSignupForm';
import  LoginForm from './components/pages/authentication/LoginForm';
import Home from './components/pages/Home';
import PrivateTestForm from './components/pages/authentication/privateTestForm';
import AvailableBarbers from './components/pages/appointments/AvailableBarbers';
import BookAppointment from './components/pages/appointments/bookAppointment';
import AppointmentList from './components/pages/appointments/AppointmentList';

import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null); // This state is used to store the user information
  const [loading, setLoading] = useState(true); // This state is used to store the loading state

  // This section of the App component is used to check if the user is logged in
  useEffect(() => { 
    const unsubscribe = onAuthStateChanged(auth, (user) => { 
      if(user){ // If the user is logged in, the user information is stored in the state
        setUser(user); // The user information is stored in the state
        setLoading(false); // The loading state is set to false
        return;
      }
      setUser(null); // If the user is not logged in, the state is set to null
      setLoading(false); // The loading state is set to false

    });

    return () => unsubscribe(); // This function is used to unsubscribe the user

  }, []);

  if(loading){ // If the loading state is true, the loading message is displayed
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      {user ? <CustomerNavbar /> : <Navbar />} {/* If the user is logged in, the CustomerNavbar is displayed, else the Navbar is displayed */}
      <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/barber-signup" element={<BarberSignupForm />} />
          <Route path="/customer-signup" element={<CustomerSignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/private" element={<ProtectedRoute user={user}><PrivateTestForm /></ProtectedRoute> } />
          <Route path="/available-barbers" element={<ProtectedRoute user={user}><AvailableBarbers /></ProtectedRoute> } />
          <Route path="/book-appointment" element={<ProtectedRoute user={user}><BookAppointment /></ProtectedRoute> } />
          <Route path="/appointments" element={<ProtectedRoute user={user}><AppointmentList /></ProtectedRoute> } />

        </Routes>
    </div>
  );
}

export default App;
