import React from 'react'
import { RiChatVoiceAiLine } from "react-icons/ri";
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <div className='flex justify-between px-4 py-2 '>
            <section className='logo flex items-center gap-1'>
                <RiChatVoiceAiLine size={30} className='text-blue-500' />
                <span className='text-xl text-blue-500 font-bold font-serif'>Let's Chats</span>
            </section>
            <section className='flex gap-4 list-none font-mono'>
                <li className='hover:bg-blue-100 px-2 py-1 hover:scale-110 rounded-sm'><Link to={'/login'}>Login</Link></li>
                <span className='py-1 '>|</span>
                <li className='hover:bg-blue-100 px-2 py-1 hover:scale-110 rounded-sm'><Link to={'/register'}>Signup</Link></li>
            </section>
        </div>
    )
}

export default Navbar