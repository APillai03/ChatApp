import React, { useState } from 'react';
import useConversation from '../Zustand/useconversation';
import toast from 'react-hot-toast';

const usesendmessages = () => {
    const [loading, setloading] = useState(false); // Initialize loading state

    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setloading(true);
        try {
            const token = localStorage.getItem("chat-token");
            console.log("id send in msg ",selectedConversation._id)

            const res = await fetch(`http://localhost:8080/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            console.log(data)
            if (data.error) throw new Error(data.error);

            // Assuming setmessages is correctly defined to update Zustand state
            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    };

    return {
        sendMessage,
        loading
    };
};

export default usesendmessages;
