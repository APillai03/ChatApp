import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../Zustand/useconversation.js";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        console.log("useListenMessages hook mounted");

        const audio = new Audio("/level-up-191997.mp3"); // Path to your sound file

        socket?.on("newMessage", (newMessage) => {
            console.log("Received new message:", newMessage);

            newMessage.shouldShake = true;
            setMessages([...messages, newMessage]);

            audio.play().catch(error => console.error("Failed to play sound:", error));
        });

        return () => {
            console.log("useListenMessages hook unmounted");
            socket?.off("newMessage");
        };
    }, [socket, setMessages, messages]);
};

export default useListenMessages;
