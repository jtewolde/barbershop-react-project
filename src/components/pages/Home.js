import React from "react";
import './Home.css';

export default function Home() {
    return (
        <div className="home-background"> {/* Unique wrapper class */}
            <div className='home'>
                <h1 className='home-title'>Welcome to Timely Cuts!</h1>
                <p>Welcome to Timely Cuts! The best place to book your next haircut appointment!</p>
                <p>This Web Application is designed to help you book your next haircut appointment with your favorite barber with
                    ease.</p>
                <p>You can also sign up as a barber and have your customers book appointments with you
                    through this platform!</p>
                <p>As a customer, you can view the barbers available in your area and book an appointment with them based on their availability.</p>
                <p>As a barber, you can view the appointments that your customers have booked with you and manage them.</p>
                <p>Sign up as a customer or barber to get started!</p>
            </div>
        </div>
    )
}
