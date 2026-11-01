import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const userAuthContext = createContext();

const AuthContext = ({ children }) => {

    const [registerUser, setRegisterUser] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const [signIn, setSignIn] = useState({
        email: "",
        password: ""
    })

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    // Checks whether the user is logged in by verifying the JWT cookie on the server
    const checkAuth = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/user/verify', { withCredentials: true })
            setIsAuthenticated(true)
            setUser(res.data.user)
        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
     useEffect(() => {
        checkAuth()
    }, [])

    const signupUser = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/user/register', {
                fullName: registerUser.fullName,
                email: registerUser.email,
                password: registerUser.password,
            }, { withCredentials: true })
            const result = await res.data;
            setRegisterUser({
                fullName: "",
                email: "",
                password: ""
            })
            setIsAuthenticated(true)
            await checkAuth()
            toast.success(result.message)
            return { success: true }
        } catch (error) {
            console.error("Error registering user:", error.message);
            if (error.status === 409) {
                return (toast.error("User already exists"));
            }
            toast.error("Registration failed")
            return { success: false };
        }
    }

    const loginUser = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/user/login', {
                email: signIn.email,
                password: signIn.password,
            }, { withCredentials: true })
            const result = await res.data;
            setSignIn({
                email: "",
                password: ""
            })
            setIsAuthenticated(true)
            await checkAuth()
            toast.success(result.message)
            return { success: true }
        } catch (error) {
            console.error("Error logging in user:", error.message);
            toast.error("Login failed")
            return { success: false }
        }
    }

    const logoutUser = async () => {
        try {
            await axios.get('http://localhost:3000/api/user/logout', { withCredentials: true })
            setIsAuthenticated(false)
            setUser(null)
            toast.success("Logged out successfully")
        } catch (error) {
            console.error("Error logging out user:", error.message);
            toast.error("Logout failed")
        }
    }

    return (
        <div> <userAuthContext.Provider value={{
            registerUser,
            setRegisterUser,
            signIn,
            setSignIn,
            signupUser,
            loginUser,
            logoutUser,
            isAuthenticated,
            loading,
            user,
            checkAuth,
        }}>
            {children}
        </userAuthContext.Provider></div>

    )

}
export default AuthContext
