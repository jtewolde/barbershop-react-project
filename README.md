# TimelyCuts

**TimelyCuts** is a modern web application designed to streamline appointment booking for barbers and customers. It allows barbers to manage their schedules, and customers to conveniently book appointments, view barbers’ availability, and keep track of their upcoming bookings. The app provides real-time appointment management and a calendar view for better organization.

## Features

### 1. **User Authentication**
- **Barbers** and **Customers** can create accounts and log in securely.
- Firebase Authentication ensures user data is secure and session management is handled efficiently.

### 2. **Role-Based Navigation**
- Based on the logged-in user’s role (barber or customer), the app presents a tailored experience:
  - **Customers** can browse barbers, book appointments, and view scheduled appointments.
  - **Barbers** can view requested appointments, confirm/cancel appointments, and manage their schedule.

### 3. **Appointment Booking**
- Customers can view available barbers and book an appointment by selecting a date and time.
- Barbers can review appointment requests and confirm or cancel bookings.

### 4. **Appointment Calendar**
- Both barbers and customers can view their confirmed and scheduled appointments on a calendar interface, powered by `react-big-calendar`.
- The calendar shows appointment start and end times, providing an overview of the day’s bookings.

### 5. **Real-Time Updates**
- Appointments can be confirmed or canceled in real-time, and customers are notified of the status change.
- The app dynamically updates the appointment list and calendar when changes are made.

### 6. **Firebase Integration**
- **Firestore Database** is used for storing user information, appointments, and role-based data.
- **Firebase Authentication** handles user sign-ups and login securely.
  
### 7. **Responsive UI**
- The UI is designed to work seamlessly across desktops, tablets, and mobile devices, ensuring accessibility for all users.

## Tech Stack

### Frontend:
- **React.js**: A JavaScript library for building user interfaces, ensuring a dynamic and interactive user experience.
- **React Router**: Used for navigation between different pages and routes within the app.
- **React-Big-Calendar**: Used to integrate the calendar for users to view their scheduled appointments.
- **React-Hot-Toast**: A notification library to display success or error messages.
- **Moment.js**: A JavaScript library used for date and time manipulation.
  
### Backend:
- **Firebase Firestore**: A cloud-hosted NoSQL database used to store user accounts, appointment details, and other application data.
- **Firebase Authentication**: Used for managing user authentication with secure login and registration.

### Tools:
- **CSS Modules**: Used for styling components with encapsulation and preventing style conflicts.
- **Toast Notifications**: Integrated for user feedback on appointment status changes, deletions, and other actions.
