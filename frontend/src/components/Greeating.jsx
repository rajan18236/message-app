import React, { useContext } from 'react'
import { userAuthContext } from '../context/AuthContext'
import { RiChatVoiceAiLine } from "react-icons/ri";


const Greeating = () => {
    const { user } = useContext(userAuthContext)
    return (
        <div className='w-full flex justify-center items-center flex-col gap-1'>
            <div className='flex items-center gap-2'>
                <RiChatVoiceAiLine size={40} className='text-blue-500 animate-bounce' />
            </div>
            <h1 className="text-xl font-bold text-gray-800 ">
                Hello, {user?.fullName}!
            </h1>
            <p className='text-sm text-zinc-600'>Start chat with your Friends</p>
        </div>
    )
}

export default Greeating