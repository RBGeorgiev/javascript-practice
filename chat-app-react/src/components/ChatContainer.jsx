import { useState } from "react";
import { ChatBar } from "./ChatBar";
import { MessagesContainer } from "./MessagesContainer";

export const ChatContainer = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (newMessage) => {
        setMessages([...messages, ...newMessage]);
    }

    return (
        <div className="chatContainer">
            <MessagesContainer messages={messages} />
            <ChatBar addMessage={addMessage} />
        </div>
    )
}