import React, { useContext } from 'react'
import { userAuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';
import { TiHomeOutline } from "react-icons/ti";
import { RiChatVoiceAiLine } from "react-icons/ri";

const Login = () => {
    const { signIn, setSignIn ,loginUser} = useContext(userAuthContext);
    const handleUserLogin = async (e) => {
        e.preventDefault();
        await loginUser();
    }

    return (
        <div id="app" className='w-full h-[90vh] flex justify-center items-center relative'>
  <div className='absolute left-30 top-10 bg-blue-500 w-10 h-10 rounded-2xl animate-bounce'>
                <Link to={"/"} className='flex justify-center py-3 text-white'>
                    <TiHomeOutline size={20} />
                </Link>
            </div>
            {/* <!-- Contenedor del login --> */}
            <div className="login-container w-md  rounded-2xl p-4 text-center ">

                {/* <!-- Logo / Icono --> */}
                <div className="login-icon text-blue-400 flex gap-1 justify-center w-full my-4"> 
                    <RiChatVoiceAiLine size={35} className='text-blue-500' />
                                <span className='text-2xl text-blue-500 font-bold font-serif'>Let's Chats</span></div>

                {/* <!-- Título --> */}
                <h1 className="login-title font-bold">Login</h1>
                <p className="login-sub">sign in to your account</p>

                {/* <!-- Formulario --> */}
                <form id="loginForm" onSubmit={handleUserLogin}>

                    {/* <!-- Campo Username --> */}
                    <div className="input-group flex-col gap-3 my-2 items-center ">
                        <label className='block text-start' >
                            Email</label>
                        <input type="email" id="username" placeholder="Enter your email" className=' w-full py-2 px-2 border-2 border-zinc-700 rounded-md outline-none' value={signIn.email} onChange={(e) => { setSignIn({ ...signIn, email: e.target.value }) }} required />
                    </div>

                    {/* <!-- Campo Password --> */}
                    <div className="input-group flex-col gap-3 my-2 items-center">
                        <label className='block text-start' >Password</label>
                        <input type="password" id="password" placeholder="Enter your password" className=' w-full py-2 px-2 border-2 border-zinc-700 rounded-md outline-none' value={signIn.password} onChange={(e) => setSignIn({ ...signIn, password: e.target.value })} required />
                    </div>

                    {/* <!-- Opciones: Remember me + Forgot password --> */}
                    <div className="login-options h=[10vh] my-4 flex justify-between">
                        <label className="checkbox-label ">
                            <input type="checkbox" />
                            <span className="checkmark mx-1"></span>
                            Remember me
                        </label>
                        <a href="#" className="forgot-link">Forgot password?</a>
                    </div>

                    {/* <!-- Botón de inicio de sesión --> */}
                    <button type="submit" className="px-4 py-2 bg-blue-500 rounded-2xl text-white cursor-pointer">SIGN IN</button>

                    {/* <!-- Enlace a registro --> */}
                    <p className="signup-link my-2">
                        Don't have an account ? <Link to={"/register"} className='text-blue-400'>Sign up</Link>
                    </p>

                </form>

            </div>
        </div>
    )
}

export default Login