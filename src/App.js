
import './App.css';
import Navbar  from './components/Navbar';
import React from 'react';
import  BarberSignupForm from './components/pages/BarberSignupForm';
import  CustomerSignupForm  from './components/pages/CustomerSignupForm';
import  LoginForm from './components/pages/LoginForm';
import Home from './components/pages/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/barber-signup" element={<BarberSignupForm />} />
          <Route path="/customer-signup" element={<CustomerSignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
    </div>
  );
}

export default App;
