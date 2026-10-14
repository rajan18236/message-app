import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';

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
    }

    const loginUser = async () => {
        const res = await axios.post('http://localhost:3000/api/user/login', {
            email: signIn.email,
            password: signIn.password,
        })
        const result = await res.data;
        setSignIn({
            email: signIn.email,
            password: signIn.password,
        })

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