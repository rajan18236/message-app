import io from 'socket.io-client';
import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { userAuthContext } from './AuthContext';

export const SocketUserContext = createContext()

const SocketContext = ({ children}) => {

    const { user } = useContext(userAuthContext)
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [unreadCounts, setUnreadCounts] = useState({});

    // Tracks the userId of the conversation currently open in ChatBox
    // so we don't increment the badge for messages the user is already reading
    const activeChatRef = useRef(null);

    const playNotificationSound = () => {
        const audio = new Audio('/notification.wav');
        audio.volume = 0.5;
        audio.play().catch((err) => console.log("Audio play blocked:", err.message));
    };

    // Reset unread count for a specific sender (called when opening their chat)
    const clearUnread = (senderId) => {
        setUnreadCounts((prev) => {
            if (!prev[senderId]) return prev;
            const next = { ...prev };
            delete next[senderId];
            return next;
        });
    };

    // Set the currently open conversation so the notification listener
    // knows not to badge messages the user is actively viewing
    const setActiveChat = (userId) => {
        activeChatRef.current = userId;
        if (userId) clearUnread(userId);
    };

    useEffect(() => {

        // Don't connect if user is not logged in
        if (!user?._id) {
            setSocket(null);
            setOnlineUsers([]);
            setUnreadCounts({});
            activeChatRef.current = null;
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

        // Listen for message notifications (separate from newMessage so we
        // can play a sound + track unread without double-processing)
        newSocket.on("notification", (data) => {
            const { senderId } = data;
            playNotificationSound();
            // Only increment the badge if the user is NOT currently viewing this chat
            if (activeChatRef.current !== senderId) {
                setUnreadCounts((prev) => ({
                    ...prev,
                    [senderId]: (prev[senderId] || 0) + 1,
                }));
            }
        });

        // Save socket connection
        setSocket(newSocket)
        

        // Cleanup
        return () => {
            newSocket.close();
            setSocket(null);
            setOnlineUsers([]);
            setUnreadCounts({});
            activeChatRef.current = null;
        };

    }, [user?._id])
    return (
        <div>
            <SocketUserContext.Provider value={{ socket, onlineUsers, unreadCounts, clearUnread, setActiveChat }}>
                {children}
            </SocketUserContext.Provider>
        </div>
    )
}

export default SocketContext;
