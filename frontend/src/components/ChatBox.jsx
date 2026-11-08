import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import SearchFriendsContext, { SearchUserContext } from '../context/searchFriends';
import LogoutBtn from './LogoutBtn';
import { userAuthContext } from '../context/AuthContext';
import { SocketUserContext } from '../context/SocketContext';





const ChatBox = () => {
  const { userMessages, setUserMessages, sendingMessage, setSendingMessage, funSendMessage, anotherUser, setAnotherUser } = useContext(SearchUserContext);
  const { socket, setActiveChat } = useContext(SocketUserContext);
  const scrollRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [userMessages])

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      setUserMessages(prev => [...prev, newMessage])
    })
    return () => socket.off("newMessage")
  }, [socket, setUserMessages])


  return (
    <div className='w-[75vw] px-4 py-2 min-h-screen h-screen'>
      <header className='flex items-center py-2 justify-between h-[10%]'>
        <div className='flex items-center gap-2'>

          <IoArrowBackOutline size={20} onClick={() => {
            setUserMessages([])
            setAnotherUser({})
            setActiveChat(null)
          }
          } className='cursor-pointer' />
          <div className='text-xl'>
            {anotherUser && anotherUser.fullName ? <p>{anotherUser.fullName}</p> : null}
          </div>
        </div>
        <LogoutBtn />
      </header>
      <hr />
      <section ref={scrollRef} className='h-[80%] overflow-scroll scrollbar-none'>
        {userMessages && userMessages.length > 0 ?
          userMessages.map((message) => (
            <div key={message._id} >
              <div className='text-xs flex justify-center gap-2'>
                <h1>{new Date(message.updatedAt).toLocaleDateString()}</h1>
                <span>{new Date(message.updatedAt).toLocaleDateString('en-US', { weekday: 'long' })}</span>
              </div>


              <div className='grid grid-cols-2 gap-4'>
                {message.senderId.toString() === anotherUser._id.toString() ?
                  <div className='m-2 col-start-1 text-start w-full bg-blue-100 rounded-2xl px-2 py-2'>
                    <p className=' px-2'>{message.textMessage}</p>
                    <span className='text-xs px-2'>{new Date(message.updatedAt).toLocaleTimeString()}</span>
                  </div>
                  : <div className='m-2 col-start-2 text-end w-full bg-blue-100 rounded-2xl px-2 py-2'>
                    <p className=' px-2'>{message.textMessage}</p>
                    <span className='text-xs px-2'>{new Date(message.updatedAt).toLocaleTimeString()}</span>
                  </div>
                }
              </div>
            </div>
          )
          )
          : null}
      </section >
      <section className='bg-white border-zinc-500 w-[95%] rounded-2xl flex px-2 py-2 items-center mx-5'>
        <input type="text" className='outline-none w-[98%] px-2' value={sendingMessage} onChange={(e) => {
          setSendingMessage(e.target.value)
        }} />
        <IoMdSend size={25} onClick={() => funSendMessage(anotherUser._id)} />
      </section>
    </div >
  )
}

export default ChatBox