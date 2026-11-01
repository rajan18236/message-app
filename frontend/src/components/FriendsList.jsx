import React, { useContext, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { SearchUserContext } from '../context/searchFriends';



const FriendsList = () => {

  const { userName, setUserName, searchingUser, friends, searchFriends, startChating } = useContext(SearchUserContext)


  return (
    <div className='w-[25vw]  px-5 py-5 min-h-screen max-h-screen h-full overflow-scroll scrollbar-thin '>
      <div className='flex items-center w-[90%] px-4 py-2 bg-white border-zinc-600 rounded-3xl justify-between'>
        <input type="text" className='h-full outline-none w-[95%]' placeholder='Search UserName ' value={userName} onChange={(e) => {
          setUserName(e.target.value)
          searchingUser()
        }
        } />
        <FaSearch className='cursor-pointer' onClick={() => {
          searchingUser();
        }} />
      </div >
      <div className='relative mt-4'>
        {userName.length > 0 ?
          <div className='text-center'>
            {searchFriends && searchFriends.length > 0 ? (searchFriends.map((user) => (
              <h2 key={user._id} className='text-xl py-3 px-auto border-y border-zinc-600  cursor-pointer' onClick={() => startChating(user._id)}>{user.fullName}</h2>
            ))) : null}
          </div>
          :
          <div className='mt-4'>
            {friends.map((user) => (
              <h2 key={user._id} className='text-xl py-3 px-3 border-y border-zinc-600 cursor-pointer' onClick={() => startChating(user._id)}>{user.fullName}</h2>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default FriendsList