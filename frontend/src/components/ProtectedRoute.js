import { Navigate } from 'react-router-dom';

// This function is used to protect the routes that require authentication
export const ProtectedRoute = ({ children, user }) => {
    console.log(user);
    return user ? children : <Navigate to="/login" />;
}