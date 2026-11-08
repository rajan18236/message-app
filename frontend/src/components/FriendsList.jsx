import React, { useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import { SearchUserContext } from '../context/searchFriends';
import { SocketUserContext } from '../context/SocketContext';


const FriendsList = () => {

  const { userName, setUserName, searchingUser, friends, searchFriends, startChating } = useContext(SearchUserContext)
  const { onlineUsers, unreadCounts } = useContext(SocketUserContext)

  // Check whether a given user is currently online
  const isOnline = (userId) => onlineUsers?.includes(userId)
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
              <div key={user._id} className='flex items-center gap-2 py-3 px-3 border-y border-zinc-600 cursor-pointer' onClick={() => startChating(user._id)}>
                {isOnline(user._id) && <span className='w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-green-300 shrink-0'></span>}
                <h2 className='text-xl'>{user.fullName}</h2>
                {unreadCounts[user._id] > 0 && (
                  <span className='ml-auto bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center shrink-0'>
                    {unreadCounts[user._id]}
                  </span>
                )}
              </div>
            ))) : null}
          </div>
          :
          <div className='mt-4'>
            {friends.map((user) => (
              <div key={user._id} className='flex items-center gap-2 py-3 px-3 border-y border-zinc-600 cursor-pointer' onClick={() => startChating(user._id)}>
                {isOnline(user._id) && <span className='w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-green-300 shrink-0'></span>}
                <h2 className='text-xl'>{user.fullName}</h2>
                {unreadCounts[user._id] > 0 && (
                  <span className='ml-auto bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center shrink-0'>
                    {unreadCounts[user._id]}
                  </span>
                )}
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default FriendsList