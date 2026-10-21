import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';
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

    const signupUser = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/user/register', {
                fullName: registerUser.fullName,
                email: registerUser.email,
                password: registerUser.password,
            })
            const result = await res.data;
            setRegisterUser({
                fullName: "",
                email: "",
                password: ""
            })
            toast.success(result.message)
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
            })
            const result = await res.data;
            setSignIn({
                email: "",
                password: ""
            })
            toast.success(result.message)
        } catch (error) {
            console.error("Error logging in user:", error.message);
            toast.error("Login failed")
        }

    }

    return (
        <div> <userAuthContext.Provider value={{
            registerUser,
            setRegisterUser,
            signIn,
            setSignIn,
            signupUser,
            loginUser
        }}>
            {children}
        </userAuthContext.Provider></div>

    )

}
export default AuthContext