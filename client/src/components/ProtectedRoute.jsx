import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    // If no token exists, redirect to signin
    if (!token) {
        return <Navigate to="/auth/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;