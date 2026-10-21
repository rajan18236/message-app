import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";



const ChatBox = () => {
  return (
    <div className='w-[75vw] relative px-4 py-2 h-screen'>
      <header className='absoulate top-0 flex gap-4 items-center py-2'>

        <IoArrowBackOutline size={20} />
        <div className='text-xl'>
          Rajan
        </div>
      </header>
      <hr />
      <section>
        message
      </section>
      <section className='bg-white border-zinc-500 w-[95%] rounded-2xl flex px-2 py-2 items-center absolute bottom-5 left-0 mx-5'>
        <input type="text" className='outline-none w-[98%] px-2' />
        <IoMdSend size={25} />
      </section>
    </div>
  )
}

export default ChatBox