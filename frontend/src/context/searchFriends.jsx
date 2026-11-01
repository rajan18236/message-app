import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


export const SearchUserContext = createContext()


const SearchFriendsContext = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const [searchFriends, setSearchFriends] = useState([]);
    const [userName, setUserName] = useState("");
    const [userMessages, setUserMessages] = useState([]);
    const [anotherUser, setAnotherUser] = useState({});
    const [sendingMessage, setSendingMessage] = useState("");

    const chatedWith = async () => { //Getting other user whom the person have chated with 
        try {
            const res = await axios.get(`http://localhost:3000/api/search/chatedWith`, { withCredentials: true })
            const result = res.data;
            setFriends(result)
        } catch (error) {
            console.log(error.message);
        }
    }

    const searchingUser = async () => { // Search Other friends 
        try {
            const res = await axios.get(`http://localhost:3000/api/search/name/${userName}`, { withCredentials: true })
            const result = res.data;
            // console.log(result);
            setSearchFriends(result)
        } catch (error) {
            console.log(error.message);
        }
    }

    const startChating = async (receiverId) => { // Fetching conversation between LoggedIn person and receiverId (another person id)
        try {
            const res = await axios.get(`http://localhost:3000/api/search/startingChating/${receiverId}`, { withCredentials: true })
            const result = res.data;
            console.log(result.messages);
            setUserMessages(result.messages)
            setAnotherUser(result.AnotherUser)
        } catch (error) {
            console.log(error.message);
        }
    }

    const funSendMessage = async (receiverId) => {
        try {
            const res = await axios.post(`http://localhost:3000/api/message/send/${receiverId}`, {
                message: sendingMessage
            }, { withCredentials: true })
            // if (res.data.success) return toast.success("successfull to send messages")
                setSendingMessage("")
        } catch (error) {
            console.log(error.message);

        }
    }

    return (
        <div><SearchUserContext.Provider value={{
            userName,
            setUserName,
            searchingUser,
            friends,
            searchFriends,
            startChating,
            userMessages,
            setUserMessages,
            chatedWith,
            sendingMessage,
            setSendingMessage,
            funSendMessage,
            anotherUser,
            setAnotherUser,
        }}>{children}</SearchUserContext.Provider></div>
    )
}

export default SearchFriendsContext