import React from 'react'
import { FaSearch } from "react-icons/fa";


const FriendsList = () => {
  const users = [
    "Rajan",
    "Ram",
    "Sita",
    "Hari",
    "Gita",
    "Suman",
    "Anisha",
    "Bikash",
    "Nisha",
    "Aarav",
    "Anisha",
    "Bikash",
    "Nisha",
    "Aarav"
  ];
  return (
    <div className='w-[25vw]  px-5 py-5 min-h-screen max-h-screen h-full overflow-scroll scrollbar-thin '>
      <div className='flex items-center w-[90%] px-4 py-2 bg-white border-zinc-600 rounded-3xl justify-between'>
        <input type="text" className='h-full outline-none w-[95%] '/>
        <FaSearch className='cursor-pointer' />
      </div>
      <div className='mt-6'>
        {users.map((user) => (
          <h2 className='text-xl py-3 px-3 border-y border-zinc-600 cursor-pointer'>{user}</h2>
        ))}
      </div>
    </div>
  )
}

export default FriendsList