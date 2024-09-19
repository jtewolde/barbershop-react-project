import CalendarView from "../../../CalendarView";
import './calendarView.css';

// Function to display the barber calendar
const BarberCalendar = () => {
    return (
        <div className = "calendar">
            <h1>Barber Calendar</h1>
            <CalendarView />
        </div>
    );
}

export default BarberCalendar;