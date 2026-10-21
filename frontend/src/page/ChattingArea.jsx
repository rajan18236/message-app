import React from 'react'
import FriendsList from '../components/FriendsList'
import ChatBox from '../components/ChatBox'

const ChattingArea = () => {
  return (
    <div className=' flex max-h-screen bg-blue-200'>
        <FriendsList/>
        <ChatBox/>
    </div>
  )
}

export default ChattingArea