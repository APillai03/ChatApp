import { useEffect, useState } from 'react';
import useConversation from "../Zustand/useconversation.js";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("chat-token");
                console.log("tokens send in get msg ", token);

                const res = await fetch(`http://localhost:8080/api/messages/get/${selectedConversation._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });

                const data = await res.json(); // Parse the response data
                console.log("msg", data);

                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation, setMessages]);

    return {
        messages, loading
    };
};

export default useGetMessages;
