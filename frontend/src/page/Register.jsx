import React, { useContext } from 'react';
import { userAuthContext } from '../context/AuthContext';


const Register = () => {

    const { registerUser, setRegisterUser, signupUser } = useContext(userAuthContext);
    const handleUserSignup = async (e) => {
        e.preventDefault()
        await signupUser()
    }
    return (
        <div id="app" className='w-full h-[90vh] flex justify-center items-center'>

            {/* <!-- Contenedor del login --> */}
            <div className="login-container w-md border-zinc-600 border-2 rounded-2xl p-4 text-center ">

                {/* <!-- Logo / Icono --> */}
                <div className="login-icon text-blue-500">✦</div>

                {/* <!-- Título --> */}
                <h1 className="login-title">Sign up</h1>
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
                        <input type="password" id="password" placeholder="Enter your password" className=' w-full py-2 px-2 border-2 border-zinc-700 rounded-md outline-none' value={registerUser.password} onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })} required />
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
                        I already have account | <a href="#" className='pointer'>Sign in</a>
                    </p>

                </form>

            </div>
        </div>
    )
}

export default Register