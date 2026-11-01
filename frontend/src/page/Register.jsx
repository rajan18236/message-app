import React, { useContext } from 'react';
import { userAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { TiHomeOutline } from "react-icons/ti";
import { RiChatVoiceAiLine } from "react-icons/ri";



const Register = () => {

    const { registerUser, setRegisterUser, signupUser } = useContext(userAuthContext);

      const navigate = useNavigate()
    const handleUserSignup = async (e) => {
        e.preventDefault()
       const result =  await signupUser()
        if(result?.success){
            navigate('/chat')
        }
    }
    return (
        <div id="app" className='w-full h-[90vh] flex justify-center items-center relative'>
            <div className='absolute left-30 top-10 bg-blue-500 w-10 h-10 rounded-2xl animate-bounce'>
                <Link to={"/"} className='flex justify-center py-3 text-white'>
                    <TiHomeOutline size={20} />
                </Link>
            </div>
          
            {/* <!-- Contenedor del login --> */}
            <div className="login-container w-md border-zinc-600  rounded-2xl p-4 text-center ">
                {/* <!-- Logo / Icono --> */}
<div className="login-icon text-blue-400 flex gap-1 justify-center w-full my-4"> 
                    <RiChatVoiceAiLine size={35} className='text-blue-500' />
                                <span className='text-2xl text-blue-500 font-bold font-serif'>Let's Chats</span></div>

                {/* <!-- Título --> */}
                <h1 className="login-title font-bold">Sign up</h1>
                <p className="login-sub">Create your account</p>

                {/* <!-- Formulario --> */}
                <form id="loginForm" autocomplete="off" onSubmit={handleUserSignup}>

                    {/* <!-- Campo Username --> */}
                    <div className="input-group flex-col gap-3 my-2 items-center ">
                        <label for="username" className='block text-start' >
                            Username</label>
                        <input type="text" id="username" placeholder="Enter your nick name" className=' w-full py-2 px-2 border-2 border-zinc-700 rounded-md outline-none' value={registerUser.fullName} onChange={(e) => {
                            setRegisterUser({ ...registerUser, fullName: e.target.value })
                        }} required />
                    </div>
                    <div className="input-group flex-col gap-3 my-2 items-center ">
                        <label for="username" className='block text-start' >
                            Email</label>
                        <input type="email" id="email" placeholder="Enter your email" className=' w-full py-2 px-2 border-2 border-zinc-700 rounded-md outline-none' value={registerUser.email} onChange={(e) => {
                            setRegisterUser({ ...registerUser, email: e.target.value });
                        }} required />
                    </div>

                    {/* <!-- Campo Password --> */}
                    <div className="input-group flex-col gap-3 my-2">
                        <label for="password" className='block text-start' >Password</label>
                        <input type="password" id="password" placeholder="Enter your password" className=' w-full py-2 px-2 border-2     border-zinc-700 rounded-md outline-none' value={registerUser.password} onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })} required />
                    </div>

                    {/* <!-- Opciones: Remember me + Forgot password --> */}
                    <div className="login-options h=[10vh] my-4 flex justify-between">
                        <label className="checkbox-label ">
                            <input type="checkbox" />
                            <span className="checkmark mx-1"></span>
                            Remember me
                        </label>
                        {/* <a href="#" className="forgot-link">Forgot password?</a> */}
                    </div>

                    {/* <!-- Botón de inicio de sesión --> */}
                    <button type="submit" className="px-4 py-2 bg-blue-500 rounded-2xl text-white cursor-pointer">SIGN UP</button>

                    {/* <!-- Enlace a registro --> */}
                    <p className="signup-link my-2 ">
                        Already have account ? <Link to={'/login'} className='text-blue-400'>Sign in</Link>
                    </p>

                </form>

            </div>
        </div>
    )
}

export default Register