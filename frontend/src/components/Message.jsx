import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    // Capture the time the message was sent
    const messageTime = new Date(message?.createdAt || Date.now()); // Assuming the message has a 'createdAt' property
    const formattedTime = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img 
                        alt="Profile" 
                        src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto } 
                    />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">{formattedTime}</time> {/* Display the formatted time */}
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''}`}>
                {message?.message}
            </div>
        </div>
    );
}

export default Message;