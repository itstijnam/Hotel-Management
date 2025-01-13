import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, allowedRoles }) {
    
    const { user } = useSelector((store) => store.auth);

    if (!user) {
        return <Navigate to="/login" />;
    }
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute;
