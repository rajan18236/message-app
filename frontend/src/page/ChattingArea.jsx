import React, { useContext, useEffect } from 'react'
import FriendsList from '../components/FriendsList'
import ChatBox from '../components/ChatBox'
import Greeating from '../components/Greeating'
import { SearchUserContext } from '../context/searchFriends'

const ChattingArea = () => {
  const { userMessages, chatedWith } = useContext(SearchUserContext);

  useEffect(() => {
    chatedWith()
  }, []);

  return (
    <div className=' flex max-h-screen bg-blue-200'>
      <FriendsList />
      {userMessages && userMessages.length > 0 ? <ChatBox /> : <Greeating />}
    </div>
  )
}

export default ChattingArea