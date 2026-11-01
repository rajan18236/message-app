import io from 'socket.io-client';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { userAuthContext } from './AuthContext';

export const SocketUserContext = createContext()

const SocketContext = ({ children}) => {

    const { user } = useContext(userAuthContext)
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {

        // Don't connect if user is not logged in
        if (!user?._id) {
            setSocket(null);
            setOnlineUsers([]);
            return;
        }

        // Establish socket connection
        const newSocket = io("http://localhost:3000", {
            query: {
                userId: user._id
            }
        });

        // Listen for online users
        newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });

        // Save socket connection
        setSocket(newSocket)
        

        // Cleanup
        return () => {
            newSocket.close();
            setSocket(null);
            setOnlineUsers([]);
        };

    }, [user?._id])
    return (
        <div>
            <SocketUserContext.Provider value={{ socket, onlineUsers }}>
                {children}
            </SocketUserContext.Provider>
        </div>
    )
}

export default SocketContext;
