import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { userAuthContext } from '../context/AuthContext'

// Blocks access to protected routes unless the user is logged in.
// While the auth check is loading it renders nothing to avoid a premature redirect.
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(userAuthContext)

    if (loading) return null

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
